var fs = require("fs");

// Creates a readable stream of 1024 bytes per chunk
var readable = fs.createReadStream(__dirname + "/greeting.txt", {
  encoding: "utf8",
  highWaterMark: 1024,
});

// Creates a writable stream to a new file
var writable = fs.createWriteStream(__dirname + "/greetingcopy.txt");

// Each chunk of 1024 bytes is written to the writable stream
readable.on("data", function (chunk) {
  console.log(chunk.length);
  writable.write(chunk);
});
