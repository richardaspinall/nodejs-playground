const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Connection Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_LOCAL_PORT,
    logging: false,
  }
);

const db = {};
const models = path.join(__dirname, '../models/sequelize'); // path to a models' folder

fs.readdirSync(models)
  .filter(function (file) {
    return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
  })
  .forEach(function (file) {
    const model = require(path.join(models, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// This creates the table if it doesn't exist (and does nothing if it already exists)
// sequelize
//   .sync()
//   .then((_result) => {
//     console.log('Sequelize: All models were synchronized successfully.');
//   })
//   .catch((err) => {
//     console.log(err);

//   });

const delay = (retryCount) => new Promise((resolve) => setTimeout(resolve, 10 ** retryCount));

async function sequelizeSync(retryCount = 0, lastError = null) {
  if (retryCount > 5) throw new Error(lastError);
  try {
    await sequelize.sync();
    console.log('Sequelize: All models were synchronized successfully.');
  } catch (error) {
    await delay(retryCount);
    return sequelizeSync(retryCount + 1, error);
  }
}

sequelizeSync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
