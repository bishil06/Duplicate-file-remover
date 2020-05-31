const getFileList = require('./src/getFileList.js');

async function main() {
  const fileList = await getFileList('./testFolder');
  console.log(fileList);
}

main();
