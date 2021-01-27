const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')
const SftpUpload = require('sftp-upload');

try {

  console.log('Server:', core.getInput('server'));
  console.log('Local Path', core.getInput('local-path')); 
  console.log('Remote Path', core.getInput('remote-path')); 

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  
  // let Client = require('ssh2-sftp-client');
  // let sftp = new Client();
  // let config = {
  //   host: core.getInput('server'),
  //   port: core.getInput('port'),
  //   username: core.getInput('user'),
  //   password: core.getInput('pass'),
  // };

  // sftp.connect(config)
  //   .then(data => {

  //   // Read local directory
  //   const dir = fs.opendirSync(core.getInput('local-path'))

  //   // Loop through directory and move each file
  //   let dirent
  //   while ((dirent = dir.readSync()) !== null) {
  //     console.log('Transferring: ' + core.getInput('local-path') + dirent.name, 'To Location: ' + core.getInput('remote-path') + dirent.name);
  //     sftp.put(core.getInput('local-path') + dirent.name, core.getInput('remote-path') + dirent.name);
  //   }

  //   dir.closeSync();
  // })
  // .then(() => {
  //   sftp.end();
  //   core.setOutput('transferStatus', 'completed');
  // })
  // .catch(err => {
  //   console.log(err, 'catch error');
  // });

  sftp2 = new SftpUpload({
      host:core.getInput('server'),
      username:core.getInput('user'),
      password:core.getInput('pass'),
      path: core.getInput('local-path'),
      remoteDir: core.getInput('remote-path'),
      excludedFolders: ['**/.git', 'node_modules'],
      exclude: ['.gitignore', '.vscode/tasks.json'],
      dryRun: false
  });

  sftp2.on('error', function(err) {
      throw err;
  })
  .on('uploading', function(progress) {
      console.log('Uploading', progress.file);
      console.log(progress.percent+'% completed');
  })
  .on('completed', function() {
      console.log('Upload Completed');
      core.setOutput('transferStatus', 'completed');
  })
  .upload();

} catch (error) {
  core.setFailed(error.message);
}