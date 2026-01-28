const fs = require("fs");

console.log("Start");

fs.readFile("file.txt", "utf-8", () => {
    console.log("file read");
});

console.log("End");
