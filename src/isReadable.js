const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const isDirectory = require('./isDirectory.js');
const isFile = require('./isFile.js');

function makeIsReadable(something) {
  let isFileOrDir = null;

  if (something === 'file') {
    // make isReadableDir
    isFileOrDir = isFile;
  } else if (something === 'directory') {
    // make isReadableFile
    isFileOrDir = isDirectory;
  }

  return async function (dir_Or_file) {
    const isSome = await isFileOrDir(dir_Or_file);

    let readable = null;
    if (isSome) {
      readable = await fsPromises
        .access(dir_Or_file, fs.constants.R_OK)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    } else {
      console.log(isFileOrDir);
      console.log(dir_Or_file);
      console.log('해당 경로를 찾지 못하거나 폴더가 아닙니다.');
      return null; // 함수 종료
    }

    return readable;
  };
}

const isReadableDir = makeIsReadable('directory');
const isReadableFile = makeIsReadable('file');

module.exports = { isReadableFile, isReadableDir };
