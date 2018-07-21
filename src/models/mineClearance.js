import {create, openAll, openAuto, openSmart, deepCopy} from '../utils/mine-utils';
import {
  MINE_STATUS_CLOSE,
  MINE_STATUS_OPEN,
  MINE_STATUS_MARKED,
  IS_MINE
} from '../utils/mine-constants';

export default {
  namespace: 'mineClearance',
  state: [],
  reducers: {
    'reset'(state, payload) {
      let stateCopy = deepCopy(state);
      const length = payload.length;
      const width = payload.width;
      const ratio = stateCopy.ratio;
      stateCopy.length = length;
      stateCopy.width = width;
      stateCopy.mineMap = create(length, width, ratio);
      return stateCopy;
    },

    'leftClick'(state, {payload: index}) {
      let stateCopy = deepCopy(state);
      let point = stateCopy.mineMap[index[0]][index[1]];
      if (point.status === MINE_STATUS_CLOSE) {
        if (point.value === IS_MINE) {
          openAll(stateCopy.mineMap);
          return stateCopy;
        }

        if (point.value === 0) {
          openAuto(stateCopy.mineMap, index);
          return stateCopy;
        }

        stateCopy.mineMap[index[0]][index[1]].status = MINE_STATUS_OPEN;
        return stateCopy;
      }

      if (point.status === MINE_STATUS_MARKED) {
        stateCopy.mineMap[index[0]][index[1]].status = MINE_STATUS_CLOSE;
        return stateCopy;
      }

      return stateCopy;
    },

    'rightClick'(state, {payload: index}) {
      let stateCopy = deepCopy(state);
      let point = stateCopy.mineMap[index[0]][index[1]];

      if (point.status === MINE_STATUS_CLOSE) {
        stateCopy.mineMap[index[0]][index[1]].status = MINE_STATUS_MARKED;
        return stateCopy;
      }

      return stateCopy;
    },

    'doubleClick'(state, {payload: index}) {
      let stateCopy = deepCopy(state);
      let point = stateCopy.mineMap[index[0]][index[1]];

      if (point.status === MINE_STATUS_OPEN && point.value !== IS_MINE) {
        openSmart(stateCopy.mineMap, index);
        return stateCopy;
      }

      return stateCopy;
    }
  },
};
