const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  let Client = require('ssh2-sftp-client');
  let sftp = new Client();
  
  sftp.connect({
    host: '127.0.0.1',
    port: '8080',
    username: 'username',
    password: '******'
  }).then(() => {
    return sftp.list('/pathname');
  }).then(data => {
    console.log(data, 'the data info');
  }).catch(err => {
    console.log(err, 'catch error');
  });

} catch (error) {
  core.setFailed(error.message);
}