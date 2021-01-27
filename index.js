const core = require('@actions/core');
const github = require('@actions/github');

try {

  console.log('Connection params', core.getInput('server'), core.getInput('port'), core.getInput('user'), core.getInput('pass'));

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  let Client = require('ssh2-sftp-client');
  let sftp = new Client();
  
  sftp.connect({
    host: core.getInput('server'),
    port: core.getInput('port'),
    username: core.getInput('user'),
    password: core.getInput('pass'),
  }).then(() => {
    return sftp.list(core.getInput('remote-path') ? core.getInput('remote-path') : '/public_html/');
  }).then(data => {
    console.log(data, 'the data info');
    core.setOutput(directory, data);
  }).catch(err => {
    console.log(err, 'catch error');
  });

} catch (error) {
  core.setFailed(error.message);
}