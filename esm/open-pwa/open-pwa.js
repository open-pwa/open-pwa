import http2 from 'http2'
// We listen on a random port but we want to run
// Read nginx config.
// resolve open-pwa
//http2.createSecureServer()

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    if (line.indexOf('start') === 0) {

    }
    console.log(line);
})
//Alternatives
//fs.readFileSync(0).toString()
/*
process.stdin.pipe(require('split')()).on('data', processLine)

function processLine (line) {
  console.log(line + '!')
}
*/