const path = require('path');

const getFileList = require('./getFileList.js');
const getRemovedDuplicateFileTable = require('./getRemovedDuplicateFileTable.js');
const copyFile = require('./copyFile.js');

async function copyRemovedDupFile(destDir, ...dupDirs) {
  const plist = dupDirs.map((dupDir) => getFileList(dupDir, true)); // 파일리스트들의 배열
  let fileLists = await Promise.all(plist);
  const fileList = fileLists.flat();

  const removedDupFileTable = await getRemovedDuplicateFileTable(fileList);

  const clist = []; // 파일복사 promise 들의 배열
  for (const [hash, file] of removedDupFileTable) {
    clist.push(
      copyFile(
        path.join(file[0].path, file[0].name),
        path.join(destDir, file[0].name)
      )
    );
  }

  const copySuccess = await Promise.all(clist); // 모든파일의 복사가 끝나면 성공여부를 전달받는다.
  console.log(copySuccess);
}

module.exports = copyRemovedDupFile;
