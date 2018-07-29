import React, {Component} from 'react';
import {Row, Col} from 'antd';

import './Json.css'
import SourcePan from "./mod/SourcePan";
import TargetPan from "./mod/TargetPan";

class Json extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  onChange(newValue) {
    this.setState({value: newValue});
  }

  render() {
    let sourceJson = this.state.value;
    return (
      <div style={{height: '100%'}}>
        <Row style={{height: '100%'}}>
          <Col span={12} style={{height: '100%'}}>
            <SourcePan onChange={this.onChange.bind(this)}/>
          </Col>
          <Col span={12} style={{height: '100%'}}>
            <TargetPan sourceJson={sourceJson}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Json;
