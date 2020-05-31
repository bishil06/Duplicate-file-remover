const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// MD 는 Message Digest 이다.

function getMD(dirent) {
  return new Promise((res, rej) => {
    const filePath = path.join(dirent.path, dirent.name);

    const hash = crypto.createHash('md5');
    const input = fs.createReadStream(filePath);

    input.on('error', (err) => {
      console.log(err);
      rej(err);
    });

    input.on('data', (chunk) => {
      hash.update(chunk);
    });

    input.on('close', () => {
      dirent.hash = hash.digest('hex');
      res(dirent);
    });
  });
}

// function getChecksum(path) {
//   return new Promise(function (resolve, reject) {
//     // crypto.createHash('sha1');
//     // crypto.createHash('sha256');
//     const hash = crypto.createHash('md5');
//     const input = fs.createReadStream(path);

//     input.on('error', reject);

//     input.on('data', function (chunk) {
//       hash.update(chunk);
//     });

//     input.on('close', function () {
//       resolve(hash.digest('hex'));
//     });
//   });
// }

module.exports = getMD;
