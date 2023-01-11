const exec = require('child_process').exec;
exec('bash build.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`${stdout}`);
  console.log(`${stderr}`);
});