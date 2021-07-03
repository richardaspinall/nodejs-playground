var fs = require("fs");
var zlib = require("zlib");

// Creates a readable stream
var readable = fs.createReadStream(__dirname + "/greeting.txt");

// Creates a writable stream
var writable = fs.createWriteStream(__dirname + "/greetingcopy.txt");

// Compressed writable stream
var compressed = fs.createWriteStream(__dirname + "/greet.txt.gz");

// Creates a readbale and writable stream
var gzip = zlib.createGzip();

// Pipe to the writable stream
readable.pipe(writable);

// Pipe to gzip r/w stream and pipes it to the compressed stream
readable.pipe(gzip).pipe(compressed);
