# SFTP Github Action

This action uses: https://www.npmjs.com/package/sftp-upload to upload the contents of a directory to a remote path using SFTP.

This action also uses encrypted Github secrets to store credentials: https://docs.github.com/en/actions/reference/encrypted-secrets

## Inputs

### `server`

**Required** Server address

### `port`

**Required** Connection Port

### `user`

**Required** Username

### `pass`

**Required** Password

### `local-path`

**Required** Local path of items to transfer

### `remote-path`

**Required** Remote destination we are sending files to

## Example usage


```
on: [push]

jobs:
  sftp_transfer_job:
    runs-on: ubuntu-latest
    name: SFTP Transfer Test
    steps:
    - uses: actions/checkout@v2
   
    - name: Connect
      id: connect
      uses: danhendrickson/sftp-transfer-action@v1.23
      with:
        server: ${{ secrets.AB_DEV_SERVER }}
        user: ${{ secrets.AB_DEV_SERVER_USER }}
        pass: ${{ secrets.AB_DEV_SERVER_PASS }}
        port: ${{ secrets.AB_DEV_SERVER_PORT }}
        local-path: './dist/'
        remote-path: '/public_html/test/'

    - name: Transfer Status
      run: echo "Transfer Status - ${{ steps.connect.outputs.transferStatus }}"
```