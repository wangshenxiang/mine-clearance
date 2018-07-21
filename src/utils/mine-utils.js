import {
    MINE_STATUS_CLOSE,
    MINE_STATUS_OPEN,
    MINE_STATUS_MARKED,
    IS_MINE
} from './mine-constants'

function setMine(mineMap, lenght, width, ratio) {
    for (let i = 0; i < lenght; i++) {
        for (let j = 0; j < width; j++) {
            let isMine = Math.random() < ratio;
            mineMap[i][j] = {
                index: [i, j],
                value: isMine ? -1 : 0,
                status: MINE_STATUS_CLOSE
            }
        }
    }
}

function calMine(mineMap, lenght, width) {
    for (let i = 0; i < lenght; i++) {
        for (let j = 0; j < width; j++) {
            if (mineMap[i][j] == IS_MINE) {
                continue;
            }
            let cnt = 0;
            i - 1 >= 0 && j - 1 >= 0 && mineMap[i - 1][j - 1].value == IS_MINE && cnt++;
            i - 1 >= 0 && j - 0 >= 0 && mineMap[i - 1][j - 0].value == IS_MINE && cnt++;
            i - 1 >= 0 && j + 1 >= 0 && mineMap[i - 1][j + 1].value == IS_MINE && cnt++;
            i - 0 >= 0 && j - 1 >= 0 && mineMap[i - 0][j - 1].value == IS_MINE && cnt++;
            i - 0 >= 0 && j + 1 >= 0 && mineMap[i - 0][j + 1].value == IS_MINE && cnt++;
            i + 1 >= 0 && j - 1 >= 0 && mineMap[i + 1][j - 1].value == IS_MINE && cnt++;
            i + 1 >= 0 && j - 0 >= 0 && mineMap[i + 1][j - 0].value == IS_MINE && cnt++;
            i + 1 >= 0 && j + 1 >= 0 && mineMap[i + 1][j + 1].value == IS_MINE && cnt++;
            mineMap[i][j] = cnt;
        }
    }
}

export default function create(lenght, width, ratio) {
    let mineMap = [[]];

    // 放置地雷
    setMine(mineMap, lenght, width, ratio);

    // 计算周围地雷数
    calMine(mineMap, lenght, width);

    return mineMap;
}

export function openAll(mineMap) {
    for (let raw of state.mineMap) {
        for (let item of raw) {
            item.status = MINE_STATUS_OPEN;
        }
    }
}

export function openAuto(mineMap, index) {
    let i = index[0];
    let j = index[1];
    if (mineMap[i][j].value != 0) {
        return;
    }

    mineMap[i][j].status = MINE_STATUS_OPEN;
    i - 1 >= 0 && j - 1 >= 0 && openAuto(mineMap, [i - 1, j - 1]);
    i - 1 >= 0 && j - 0 >= 0 && openAuto(mineMap, [i - 1, j - 0]);
    i - 1 >= 0 && j + 1 >= 0 && openAuto(mineMap, [i - 1, j + 1]);
    i - 0 >= 0 && j - 1 >= 0 && openAuto(mineMap, [i - 0, j - 1]);
    i - 0 >= 0 && j + 1 >= 0 && openAuto(mineMap, [i - 0, j + 1]);
    i + 1 >= 0 && j - 1 >= 0 && openAuto(mineMap, [i + 1, j - 1]);
    i + 1 >= 0 && j - 0 >= 0 && openAuto(mineMap, [i + 1, j - 0]);
    i + 1 >= 0 && j + 1 >= 0 && openAuto(mineMap, [i + 1, j + 1]);
}

export function openSmart(mineMap, index) {
    let i = index[0];
    let j = index[1];
    if (mineMap[i][j].status != MINE_STATUS_OPEN) {
        return;
    }

    let mineFoundCnt = 0
    i - 1 >= 0 && j - 1 >= 0 && mineMap[i - 1, j - 1].value == IS_MINE && mineMap[i - 1, j - 1].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i - 1 >= 0 && j - 0 >= 0 && mineMap[i - 1, j - 0].value == IS_MINE && mineMap[i - 1, j - 0].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i - 1 >= 0 && j + 1 >= 0 && mineMap[i - 1, j + 1].value == IS_MINE && mineMap[i - 1, j + 1].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i - 0 >= 0 && j - 1 >= 0 && mineMap[i - 0, j - 1].value == IS_MINE && mineMap[i - 0, j - 1].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i - 0 >= 0 && j + 1 >= 0 && mineMap[i - 0, j + 1].value == IS_MINE && mineMap[i - 0, j + 1].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i + 1 >= 0 && j - 1 >= 0 && mineMap[i + 1, j - 1].value == IS_MINE && mineMap[i + 1, j - 1].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i + 1 >= 0 && j - 0 >= 0 && mineMap[i + 1, j - 0].value == IS_MINE && mineMap[i + 1, j - 0].status == MINE_STATUS_OPEN && mineFoundCnt++;
    i + 1 >= 0 && j + 1 >= 0 && mineMap[i + 1, j + 1].value == IS_MINE && mineMap[i + 1, j + 1].status == MINE_STATUS_OPEN && mineFoundCnt++;

    if (mineMap[i][j].value == mineFoundCnt) {
        (i - 1 >= 0 && j - 1 >= 0) ? mineMap[i - 1, j - 1].status = MINE_STATUS_OPEN : null;
        (i - 1 >= 0 && j - 0 >= 0) ? mineMap[i - 1, j - 0].status = MINE_STATUS_OPEN : null;
        (i - 1 >= 0 && j + 1 >= 0) ? mineMap[i - 1, j + 1].status = MINE_STATUS_OPEN : null;
        (i - 0 >= 0 && j - 1 >= 0) ? mineMap[i - 0, j - 1].status = MINE_STATUS_OPEN : null;
        (i - 0 >= 0 && j + 1 >= 0) ? mineMap[i - 0, j + 1].status = MINE_STATUS_OPEN : null;
        (i + 1 >= 0 && j - 1 >= 0) ? mineMap[i + 1, j - 1].status = MINE_STATUS_OPEN : null;
        (i + 1 >= 0 && j - 0 >= 0) ? mineMap[i + 1, j - 0].status = MINE_STATUS_OPEN : null;
        (i + 1 >= 0 && j + 1 >= 0) ? mineMap[i + 1, j + 1].status = MINE_STATUS_OPEN : null;
    }
}
