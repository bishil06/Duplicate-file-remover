const path = require('path');

const copyRemovedDupFile = require('./src/copyRemovedDupFile.js');

const dupDir = './dupFolder'; // 중복된 파일이 저장된 폴더
const dupDir2 = './dupFolder2';
const destDir = './dest'; // 중복이제거된 파일들을 저장할 폴더

async function main() {
  copyRemovedDupFile(destDir, dupDir, dupDir2);
}

main();
