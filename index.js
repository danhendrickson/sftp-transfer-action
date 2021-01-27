const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')


try {

  console.log('Server:', core.getInput('server'));
  console.log('Local Path', core.getInput('local-path')); 
  console.log('Remote Path', core.getInput('remote-path')); 

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  
  let Client = require('ssh2-sftp-client');
  let sftp = new Client();
  let config = {
    host: core.getInput('server'),
    port: core.getInput('port'),
    username: core.getInput('user'),
    password: core.getInput('pass'),
  };

  sftp.connect(config)
    .then(() => {

    })
    .then(data => {

    // Create remote dir
    client.mkdir(remoteDir, true);

    // Read local directory
    // const dir = fs.opendirSync(core.getInput('local-path'))

    // Loop through directory and move each file
    // let dirent
    // while ((dirent = dir.readSync()) !== null) {
    //   console.log('Transferring: ' + core.getInput('local-path') + dirent.name, 'To Location: ' + core.getInput('remote-path') + dirent.name);
    //   sftp.put(core.getInput('local-path') + dirent.name, core.getInput('remote-path') + dirent.name);
    // }

    sftp.on('upload', info => {
      console.log(`Listener: Uploaded ${info.source}`);
    });
    sftp.uploadDir(core.getInput('local-path'), core.getInput('remote-path'));

    // dir.closeSync();
  })
  .then(() => {
    sftp.end();
    core.setOutput('transferStatus', 'completed');
  })
  .catch(err => {
    console.log(err, 'catch error');
  });


} catch (error) {
  core.setFailed(error.message);
}