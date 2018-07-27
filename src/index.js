import dva from 'dva';
import './index.css';
import {
  MINE_STATUS_CLOSE,
  MINE_STATUS_OPEN,
  MINE_STATUS_MARKED,
  IS_MINE
} from './utils/mine-constants';

// 1. Initialize
const app = dva({
  initialState: {
    products: [
      {name: 'dva', id: 1},
      {name: 'antd', id: 2},
    ],
    mineClearance: {
      length: 1,
      width: 1,
      ratio: 0.1, // 10%几率出雷
      mineMap: [
        [
          {
            status: MINE_STATUS_CLOSE, // 1:close, 2:open, 3:marked
            value: 0, // -1:mine, other:mine count around
            index: [0, 0] // 当前位点坐标，方便动作相应
          }
        ]
      ]
    }
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);
app.model(require('./models/mineClearance').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
