const { exec } = require("child_process");

exec("ls -la", (err, stdout) => {
    if (err) return console.log(err);
    console.log(stdout);
});
