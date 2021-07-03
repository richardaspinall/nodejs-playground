import { queryDB } from './db';
import { RowDataPacket, OkPacket } from 'mysql2';
import bcrypt from 'bcrypt';

import User from './User';

async function createUser() {
  const user = new User('raspinall', 'some image', 'password');

  const userExists = await checkUserExists(user.username);
  if (userExists) {
    console.log('user exists');
    return;
  }
  console.log('Inserting user');

  await queryDB({
    sql: 'INSERT INTO USERS (username,image,password) VALUES (?,?,?)',
    values: [user.username, user.image, await bcrypt.hash(user.getPassword(), 10)],
  });

  loginUser(user);

  return user;
}

async function loginUser(user: User) {
  console.log(user);

  const result = (await queryDB({
    sql: 'SELECT password FROM users WHERE username = ?',
    values: [user.username],
  })) as RowDataPacket;

  if (result[0] && (await bcrypt.compare(user.getPassword(), result[0].password))) {
    console.log('Logged in');
    return true;
  }

  return false;
}

async function checkUserExists(user: string) {
  const result = (await queryDB({
    sql: 'SELECT username FROM users WHERE username = ?',
    values: [user],
  })) as RowDataPacket;
  if (result.length > 0) {
    return result[0];
  }
  return null;
}

const newUser = createUser();
