const fs = require('fs');
const fsPromises = fs.promises;

async function isFile(filePath) {
  const isFile = await fsPromises
    .stat(filePath)
    .then((stat) => {
      return stat.isFile();
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return isFile;
}

module.exports = isFile;
