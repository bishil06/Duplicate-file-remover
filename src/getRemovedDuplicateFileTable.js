const getMD = require('./getMD.js');

async function getRemovedDuplicateFileTable(fileList) {
  const hashTable = new Map(); // key=hash, value=[dirent(file), dirent(file),...]

  for (const file of fileList) {
    const hash = await getMD(file); // key

    const value = hashTable.get(hash);
    if (value) {
      // 해당 key 에 해당하는 value가 있나 검사
      if (value[0].size === file.size) {
        // 파일 사이즈도 같은지 검사
        value.push(file);
      } else {
        // hash값은 같지만 크기가 다른 파일 즉 다른파일은 어떻게 처리를 해야 할까?
      }
    } else {
      hashTable.set(hash, [file]);
    }
  }

  return hashTable;
}

module.exports = getRemovedDuplicateFileTable;
