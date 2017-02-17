var port = process.env.PORT || 8080;

console.log("starting server on port " + port);

var exec = require('child_process').exec;
exec('./node_modules/.bin/webpack-dev-server --hot --inline --port ' + port, function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});