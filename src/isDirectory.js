const fs = require('fs');
const fsPromises = fs.promises;

async function isDirectory(directory) {
  const isDirectory = await fsPromises
    .stat(directory)
    // lstat 은 심볼릭링크의 경우 심볼릭링크 자체의 파일타입을 가져오지만
    // stat은 심볼릭링크가 가리키는 파일의 타입을 가져온다.
    .then((stat) => {
      return stat.isDirectory();
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return isDirectory;
}

module.exports = isDirectory;
