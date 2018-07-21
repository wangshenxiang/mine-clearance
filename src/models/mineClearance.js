import {create, openAll, openAuto, openSmart} from '../utils/mine-utils';
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
    'reset'(state, {payload}) {
      const length = payload.length;
      const width = payload.width;
      const ratio = state.ratio;
      state.length = length;
      state.width = width;
      state.mineMap = create(length, width, ratio);
      return state;
    },

    'leftClick'(state, {payload: index}) {
      console.log(state);
      console.log(index);
      let point = state.mineMap[index[0]][index[1]];
      if (point.status === MINE_STATUS_CLOSE) {
        if (point.value === IS_MINE) {
          openAll(state.mineMap);
          return state;
        }

        if (point.value === 0) {
          openAuto(state.mineMap, index);
          return state;
        }

        state.mineMap[index[0]][index[1]].status = MINE_STATUS_OPEN;
        return state;
      }

      if (point.status === MINE_STATUS_MARKED) {
        state.mineMap[index[0]][index[1]].status = MINE_STATUS_CLOSE;
        return state;
      }

      return state;
    },

    'rightClick'(state, {payload: index}) {
      let point = state.mineMap[index[0]][index[1]];

      if (point.status === MINE_STATUS_CLOSE) {
        state.mineMap[index[0]][index[1]].status = MINE_STATUS_MARKED;
        return state;
      }

      return state;
    },

    'doubleClick'(state, {payload: index}) {
      let point = state.mineMap[index[0]][index[1]];

      if (point.status === MINE_STATUS_OPEN && point.value !== IS_MINE) {
        openSmart(state.mineMap, index);
        return state;
      }

      return state;
    }
  },
};
