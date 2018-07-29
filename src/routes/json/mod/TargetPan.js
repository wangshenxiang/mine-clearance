import React, {Component} from 'react';
import {Icon, Tooltip, Card} from 'antd';

import './Share.css';
import shareStyles from './Share.css';
import ReactJson from 'react-json-view'
import MenuTips from "./MenuTips";

class TargetPan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      collapsed: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({value: props.sourceJson})
  }

  doOpen() {
    this.setState({collapsed: false});
  }

  doClose() {
    this.setState({collapsed: 1});
  }

  render() {
    let sourceJson = this.state.value;
    let exp = null;
    try {
      sourceJson = JSON.parse(sourceJson);
    } catch (e) {
      exp = e
    }
    return (
      <div className={shareStyles.pan}>
        <div className={shareStyles.menu}>
          {/*<Tooltip placement="bottom" title={<MenuTips text={'展开'}/>}>*/}
            {/*<span onClick={this.doOpen.bind(this)}><Icon type="arrows-alt" className={shareStyles.menuIcon}/></span>*/}
          {/*</Tooltip>*/}
          {/*<Tooltip placement="bottom" title={<MenuTips text={'折叠'}/>}>*/}
            {/*<span onClick={this.doClose.bind(this)}><Icon type="shrink" className={shareStyles.menuIcon}/></span>*/}
          {/*</Tooltip>*/}
          {/*<span className={shareStyles.menuIcon} style={{float: 'right', fontSize:10}}>*/}
            {/*powered by ace,react-ace,react-json-view*/}
          {/*</span>*/}
        </div>
        {exp != null ? sourceJson != null && sourceJson.length > 0 ?
          <span>{exp.toString()}</span>
          : null :
          <div className={shareStyles.targetPan} style={{height: '100%', overflow: 'scroll'}}>
            <ReactJson
              src={sourceJson}
              enableClipboard={false}
              displayDataTypes={false}
              displayObjectSize={false}
              collapseStringsAfterLength={false}
              iconStyle={'circle'}
              collapsed={this.state.collapsed}
              name={false}
              style={{fontFamily: 'menlo,monospace, Tahoma,"微软雅黑","幼圆"', fontWeight: 'bold'}}
            />
          </div>
        }
      </div>
    );
  }
}

export default TargetPan;
