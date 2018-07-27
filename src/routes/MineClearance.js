import React from 'react';
import {connect} from 'dva';
import MineClearancePoint from '../components/MineClearancePoint';
import MineClearanceSet from "../components/MineClearanceSet";
import { Row, Col } from 'antd';

const MineClearance = ({dispatch, mineClearance}) => {
  function handleReset(length, width) {
    dispatch({
      type: 'mineClearance/reset',
      payload: {length, width},
    });
  }

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

  function renderRow(rowNum) {
    let itemArr = [];
    for (let j = 0; j < mineClearance.mineMap[rowNum].length; ++j) {
      itemArr.push(
        <td style={{width: 32, height: 32, textAlign: 'center'}}>
          <MineClearancePoint
            onLeftClick={handleLeftClick}
            onRightClick={handleRightClick}
            onDoubleClick={handleDoubleClick}
            point={mineClearance.mineMap[rowNum][j]}
          />
        </td>
      );
    }

    return (
      <tr style={{marginTop:0, marginBottom: 0, border: 0}}>
        {itemArr}
      </tr>
    );
  }

  function renderMineArea() {
    let rowArr = [];
    for (let i = 0; i < mineClearance.mineMap.length; ++i) {
      rowArr.push(renderRow(i));
    }

    return (
      <table>
        {rowArr}
      </table>
    );
  }

  return (
    <div onContextMenu={(event) => {
      event.preventDefault()
    }}>
      <MineClearanceSet
        onSetBtnClick={handleReset}
      />

      {renderMineArea()}
    </div>
  );
};

export default connect(
  ({mineClearance}) => ({mineClearance})
)(MineClearance);
