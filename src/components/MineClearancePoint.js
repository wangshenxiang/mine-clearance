import PropTypes from 'prop-types';
import {
  MINE_STATUS_CLOSE,
  MINE_STATUS_OPEN,
  MINE_STATUS_MARKED,
  IS_MINE
} from '../utils/mine-constants';
import React from "react";
import imgBoom from "../assets/icon/31.png";
import imgNormal from "../assets/icon/11.png";

const MineClearancePoint = ({onLeftClick, onRightClick, onDoubleClick, point}) => {

  let clickTimeoutId;
  let clickCnt = 0;
  let bgColor = '#123456';
  let showNum = false;
  let showBoom = false;
  if (point.status === MINE_STATUS_CLOSE) {
    bgColor = '#000000';
  } else if (point.status === MINE_STATUS_MARKED) {
    bgColor = '#00ffff';
  } else if (point.status === MINE_STATUS_OPEN) {
    bgColor = '#ffffff';
    showNum = point.value !== IS_MINE && point !== 0;
    showBoom = point.value === IS_MINE;
  }

  function renderBoom() {
    return (
      <img src={imgBoom} />
    );
  }

  function renderNormal() {
    return (
      <img src={imgNormal}/>
    );
  }

  return (
    <span
      style={{
        fontSize: 15,
        textAlign: 'center'
      }}
      onClick={() => {
        clickCnt++;
        clearTimeout(clickTimeoutId);

        if (clickCnt < 2) {
          clickTimeoutId = setTimeout(() => {
            onLeftClick(point.index);
            clickCnt = 0;
          }, 200);
        } else if (clickCnt === 2) {
          clickTimeoutId = setTimeout(() => {
            onDoubleClick(point.index);
            clickCnt = 0;
          }, 200);
        } else {
          clickCnt = 0;
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        onRightClick(point.index);
      }}
    >
      {showNum ? point.value : ''}
      {showBoom ? renderBoom() : ''}
      {!showBoom && !showNum ? renderNormal() : ''}
    </span>
  );
};

MineClearancePoint.propTypes = {
  onLeftClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  point: PropTypes.object.isRequired,
};

export default MineClearancePoint;
