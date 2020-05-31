const getFileList = require('./src/getFileList.js');

async function main() {
  const fileList = await getFileList('./testFolder', true);
  console.log(fileList);
}

main();
