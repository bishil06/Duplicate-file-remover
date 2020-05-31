const path = require('path');
const fs = require('fs');
const {
  promises: fsPromises,
  constants: { COPYFILE_EXCL }, // 이미 파일이 있다면 복사하지 않는다.
} = fs;

const { isReadableFile } = require('./isReadable');

async function copyFile(filePath, destPath) {
  const isRableFile = isReadableFile(filePath);
  const isWableDir = await fsPromises
    .access(path.dirname(destPath), fs.constants.W_OK)
    .then(() => true)
    .catch((err) => {
      console.log(err);
      return false;
    });

  if (!isRableFile) {
    console.log(filePath + '파일을 읽을수 없습니다.');
    return false;
  }

  if (!isWableDir) {
    console.log(destPath + ' 폴더에 파일을 쓸수 없습니다.');
    return false;
  }

  if (isRableFile && isWableDir) {
    return fsPromises
      .copyFile(filePath, destPath, COPYFILE_EXCL)
      .then(() => {
        return {
          file: filePath,
          copy_sucess: true,
        };
      })
      .catch((err) => {
        console.log(err);
        console.log(filePath + '파일 복사에 실패하였습니다.');
        return {
          file: filePath,
          copy_sucess: false,
        };
      });
  }
}

// copyFile(
//   path.join(file[0].path, file[0].name),
//   path.join(destDir, file[0].name)
// )

module.exports = copyFile;
