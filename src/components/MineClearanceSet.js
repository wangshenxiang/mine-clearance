import PropTypes from 'prop-types';
import React from "react";
import {InputNumber, Button} from 'antd';

const MineClearanceSet = ({onSetBtnClick}) => {

  let length = 3;
  let width = 3;

  return (
    <div>
      长：<InputNumber min={1} max={10} defaultValue={length} onChange={value => length = value}/>
      宽：<InputNumber min={1} max={10} defaultValue={width} onChange={value => width = value}/>
      <Button type="primary" onClick={() => onSetBtnClick(length, width)}>确定</Button>
    </div>
  );
};

MineClearanceSet.propTypes = {
  onSetBtnClick: PropTypes.func.isRequired,
};

export default MineClearanceSet;
