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
        <MineClearancePoint
          onLeftClick={handleLeftClick}
          onRightClick={handleRightClick}
          onDoubleClick={handleDoubleClick}
          point={mineClearance.mineMap[rowNum][j]}
        />
      );
    }

    return (
      <Row>
        <div style={{display: 'inline'}}>
          {itemArr}
        </div>
      </Row>
    );
  }

  function renderMineArea() {
    let rowArr = [];
    for (let i = 0; i < mineClearance.mineMap.length; ++i) {
      rowArr.push(renderRow(i));
    }

    return (
      <div>
        {rowArr}
      </div>
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
