const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const { isReadableDir } = require('./isReadable');

/*
  함수명
  getFileList

  목적
  폴더를 읽어서 내부에 있는 파일들을 리스트로 반환한다.

  입력값
  폴더경로, 옵션=하위폴더까지검사

  출력값
  array

  알고리즘 순서
  입력받은 경로 가 폴더이고 접근가능한 폴더인지 검사
  폴더에서 파일을 하나씩 꺼내고 파일객체(dirent)에 경로와 size를 추가해서 배열에 추가한다.
  만들어진 파일리스트(배열)를 반환한다.
*/
async function getFileList(directory, r) {
  const isRableDir = await isReadableDir(directory);

  let dirObj = null; // Class fs.Dir
  if (isRableDir) {
    dirObj = await fsPromises
      .opendir(directory)
      .then((dir) => {
        return dir;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return null; // 함수 종료
  }

  let result = [];
  if (dirObj instanceof fs.Dir) {
    for await (const dirent of dirObj) {
      if (dirent.isDirectory()) {
        if (r) {
          // 하위 폴더까지 검사할경우만 실행
          rpath = path.join(directory, dirent.name);
          const rarray = await getFileList(rpath, r);
          result = result.concat(rarray);
        }
      } else {
        result.push(await addPathAndSizeToDirent(dirent, directory));
      }
    }
  } else {
    console.log('폴더를 여는데 실패했습니다.');
    return null;
  }

  return result;
}

async function addPathAndSizeToDirent(dirent, dir) {
  dirent.path = dir;
  dirent.size = await fsPromises
    .stat(path.join(dir, dirent.name))
    .then((stat) => stat.size)
    .catch((err) => {
      console.log('파일 사이즈를 가져오는데 실패했습니다.');
      console.log(err);
    });

  return dirent;
}

// getFileList('./testFolder', true).then((r) => console.log(r));

module.exports = getFileList;
