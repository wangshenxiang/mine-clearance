import {
  MINE_STATUS_CLOSE,
  MINE_STATUS_OPEN,
  MINE_STATUS_MARKED,
  IS_MINE
} from './mine-constants'

function setMine(length, width, ratio) {
  let mineMap = [];
  for (let i = 0; i < length; i++) {
    let mineMapRow = [];
    for (let j = 0; j < width; j++) {
      let isMine = Math.random() < ratio;
      mineMapRow[j] = {
        index: [i, j],
        value: isMine ? IS_MINE : 0,
        status: MINE_STATUS_CLOSE
      };
    }
    mineMap[i] = mineMapRow;
  }
  return mineMap;
}

function calMine(mineMap, length, width) {
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
      if (mineMap[i][j].value === IS_MINE) {
        continue;
      }
      let cnt = 0;
      isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 1) && mineMap[i - 1][j - 1].value === IS_MINE && cnt++;
      isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 0) && mineMap[i - 1][j - 0].value === IS_MINE && cnt++;
      isRowValid(mineMap, i - 1) && isColValid(mineMap, j + 1) && mineMap[i - 1][j + 1].value === IS_MINE && cnt++;
      isRowValid(mineMap, i - 0) && isColValid(mineMap, j - 1) && mineMap[i - 0][j - 1].value === IS_MINE && cnt++;
      isRowValid(mineMap, i - 0) && isColValid(mineMap, j + 1) && mineMap[i - 0][j + 1].value === IS_MINE && cnt++;
      isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 1) && mineMap[i + 1][j - 1].value === IS_MINE && cnt++;
      isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 0) && mineMap[i + 1][j - 0].value === IS_MINE && cnt++;
      isRowValid(mineMap, i + 1) && isColValid(mineMap, j + 1) && mineMap[i + 1][j + 1].value === IS_MINE && cnt++;
      mineMap[i][j].value = cnt;
    }
  }
  return mineMap;
}

function isRowValid(mineMap, i) {
  return i >= 0 && i < mineMap.length;
}

function isColValid(mineMap, j) {
  return j >= 0 && j < mineMap[0].length;
}

export function create(length, width, ratio) {

  // 放置地雷
  let mineMap = setMine(length, width, ratio);

  // 计算周围地雷数
  calMine(mineMap, length, width);
  return mineMap;
}

export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function openAll(mineMap) {
  for (let raw of mineMap) {
    for (let item of raw) {
      item.status = MINE_STATUS_OPEN;
    }
  }
}

export function openAuto(mineMap, index, historyIndexArr) {
  console.log(index);
  console.log(historyIndexArr);
  historyIndexArr.push(index);
  let i = index[0];
  let j = index[1];
  if (mineMap[i][j].value !== 0) {
    mineMap[i][j].status = MINE_STATUS_OPEN;
    return;
  }

  mineMap[i][j].status = MINE_STATUS_OPEN;
  !atHistory(historyIndexArr, [i - 1, j - 1]) && isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 1) && openAuto(mineMap, [i - 1, j - 1], historyIndexArr);
  !atHistory(historyIndexArr, [i - 1, j - 0]) && isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 0) && openAuto(mineMap, [i - 1, j - 0], historyIndexArr);
  !atHistory(historyIndexArr, [i - 1, j + 1]) && isRowValid(mineMap, i - 1) && isColValid(mineMap, j + 1) && openAuto(mineMap, [i - 1, j + 1], historyIndexArr);
  !atHistory(historyIndexArr, [i - 0, j - 1]) && isRowValid(mineMap, i - 0) && isColValid(mineMap, j - 1) && openAuto(mineMap, [i - 0, j - 1], historyIndexArr);
  !atHistory(historyIndexArr, [i - 0, j + 1]) && isRowValid(mineMap, i - 0) && isColValid(mineMap, j + 1) && openAuto(mineMap, [i - 0, j + 1], historyIndexArr);
  !atHistory(historyIndexArr, [i + 1, j - 1]) && isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 1) && openAuto(mineMap, [i + 1, j - 1], historyIndexArr);
  !atHistory(historyIndexArr, [i + 1, j - 0]) && isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 0) && openAuto(mineMap, [i + 1, j - 0], historyIndexArr);
  !atHistory(historyIndexArr, [i + 1, j + 1]) && isRowValid(mineMap, i + 1) && isColValid(mineMap, j + 1) && openAuto(mineMap, [i + 1, j + 1], historyIndexArr);
}

function atHistory(historyIndexArr, index) {
  let result = false;
  historyIndexArr.map((item, i) => {
    if (item[0] === index[0] && item[1] === index[1]) {
      result = true;
    }
    return;
  });
  return result;
}

export function openSmart(mineMap, index) {
  let i = index[0];
  let j = index[1];
  if (mineMap[i][j].status !== MINE_STATUS_OPEN) {
    return;
  }

  let mineFoundCnt = 0;
  isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 1) && mineMap[i - 1][j - 1].value === IS_MINE && mineMap[i - 1][j - 1].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 0) && mineMap[i - 1][j - 0].value === IS_MINE && mineMap[i - 1][j - 0].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i - 1) && isColValid(mineMap, j + 1) && mineMap[i - 1][j + 1].value === IS_MINE && mineMap[i - 1][j + 1].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i - 0) && isColValid(mineMap, j - 1) && mineMap[i - 0][j - 1].value === IS_MINE && mineMap[i - 0][j - 1].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i - 0) && isColValid(mineMap, j + 1) && mineMap[i - 0][j + 1].value === IS_MINE && mineMap[i - 0][j + 1].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 1) && mineMap[i + 1][j - 1].value === IS_MINE && mineMap[i + 1][j - 1].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 0) && mineMap[i + 1][j - 0].value === IS_MINE && mineMap[i + 1][j - 0].status === MINE_STATUS_OPEN && mineFoundCnt++;
  isRowValid(mineMap, i + 1) && isColValid(mineMap, j + 1) && mineMap[i + 1][j + 1].value === IS_MINE && mineMap[i + 1][j + 1].status === MINE_STATUS_OPEN && mineFoundCnt++;

  if (mineMap[i][j].value === mineFoundCnt) {
    isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 1) ? mineMap[i - 1][j - 1].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i - 1) && isColValid(mineMap, j - 0) ? mineMap[i - 1][j - 0].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i - 1) && isColValid(mineMap, j + 1) ? mineMap[i - 1][j + 1].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i - 0) && isColValid(mineMap, j - 1) ? mineMap[i - 0][j - 1].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i - 0) && isColValid(mineMap, j + 1) ? mineMap[i - 0][j + 1].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 1) ? mineMap[i + 1][j - 1].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i + 1) && isColValid(mineMap, j - 0) ? mineMap[i + 1][j - 0].status = MINE_STATUS_OPEN : null;
    isRowValid(mineMap, i + 1) && isColValid(mineMap, j + 1) ? mineMap[i + 1][j + 1].status = MINE_STATUS_OPEN : null;
  }
}
