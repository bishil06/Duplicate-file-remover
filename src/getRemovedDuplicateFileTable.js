const getMD = require('./getMD.js');

async function getRemovedDuplicateFileTable(fileList) {
  const hashTable = new Map(); // key=hash, value=[dirent(file), dirent(file),...]

  const plist = fileList.map((file) => getMD(file));

  let addHashFileList = await Promise.all(plist).then(plist); // 비동기 hash값 계산

  for (const file of addHashFileList) {
    const arr = hashTable.get(file.hash);
    if (arr) {
      if (arr[0].size === file.size) {
        arr.push(file);
      } else {
      }
    } else {
      hashTable.set(file.hash, [file]);
    }
  }

  // for (const file of fileList) {
  //   const hash = await getMD(file); // key

  //   const value = hashTable.get(hash);
  //   if (value) {
  //     // 해당 key 에 해당하는 value가 있나 검사
  //     if (value[0].size === file.size) {
  //       // 파일 사이즈도 같은지 검사
  //       value.push(file);
  //     } else {
  //       // hash값은 같지만 크기가 다른 파일 즉 다른파일은 어떻게 처리를 해야 할까?
  //     }
  //   } else {
  //     hashTable.set(hash, [file]);
  //   }
  // }

  console.log(hashTable);
  return hashTable;
}

module.exports = getRemovedDuplicateFileTable;
