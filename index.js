const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')


try {

  console.log('Connection params', core.getInput('server'), core.getInput('port'), core.getInput('user'), core.getInput('pass')); 
  console.log('Local Path', core.getInput('local-path')); 
  console.log('Remote Path', core.getInput('remote-path')); 

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
  
  let Client = require('ssh2-sftp-client');
  let sftp = new Client();

  sftp.connect({
    host: core.getInput('server'),
    port: core.getInput('port'),
    username: core.getInput('user'),
    password: core.getInput('pass'),
  }).then(connection => {
    console.log('connection',connection);
    // return sftp.list(core.getInput('remote-path'));
  }).then(data => {
    // console.log(data, 'the data info');

    // console.log('connected?')

  }).catch(err => {
    console.log(err, 'catch error');
  });


} catch (error) {
  core.setFailed(error.message);
}