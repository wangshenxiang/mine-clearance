import {
  MINE_STATUS_CLOSE,
  MINE_STATUS_OPEN,
  MINE_STATUS_MARKED,
  IS_MINE
} from '../utils/mine-constants';
import React, { Component } from "react";
import imgBoom from "../assets/icon/31.png";
import imgNormal from "../assets/icon/11.png";
import imgMarked from "../assets/icon/21.png";

class MineClearancePoint extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    let {onLeftClick, onRightClick, onDoubleClick, point} = this.props;

    let clickTimeoutId;
    let clickCnt = 0;
    let showNum = false;
    let showBoom = false;
    let showMarked = false;
    if (point.status === MINE_STATUS_CLOSE) {

    } else if (point.status === MINE_STATUS_MARKED) {
      showMarked = true;
    } else if (point.status === MINE_STATUS_OPEN) {
      showNum = point.value !== IS_MINE;
      showBoom = point.value === IS_MINE;
    }
    let showNormal = !showMarked && !showNum && !showBoom;


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

      {showNum && point.value !== 0 ? point.value : ''}
        {showBoom ? <img src={imgBoom}/> : ''}
        {showMarked ? <img src={imgMarked}/> : ''}
        {showNormal ? <img src={imgNormal}/> : ''}
    </span>
    );
  }
}

export default MineClearancePoint;
