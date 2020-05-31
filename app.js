const getFileList = require('./src/getFileList.js');
const getRemovedDuplicateFileTable = require('./src/getRemovedDuplicateFileTable.js');

async function main() {
  const fileList = await getFileList('./testFolder', true);
  const removedDupFileTable = await getRemovedDuplicateFileTable(fileList);
  console.log(removedDupFileTable);
}

main();
