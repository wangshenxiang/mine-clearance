import React from 'react';
import {connect} from 'dva';
import MineClearancePoint from '../components/MineClearancePoint';

const MineClearance = ({dispatch, mineClearance}) => {
  function handleLeftClick(index) {
    dispatch({
      type: 'mineClearance/leftClick',
      payload: index,
    });
  }

  function handleRightClick(index) {
    dispatch({
      type: 'mineClearance/rightClick',
      payload: index,
    });
  }

  function handleDoubleClick(index) {
    dispatch({
      type: 'mineClearance/doubleClick',
      payload: index,
    });
  }

  return (
    <div onContextMenu={(event) => {
      event.preventDefault()
    }}>
      <MineClearancePoint
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
        onDoubleClick={handleDoubleClick}
        point={mineClearance.mineMap[0][0]}
      />
    </div>
  );
};

export default connect(
  ({mineClearance}) => ({mineClearance})
)(MineClearance);
