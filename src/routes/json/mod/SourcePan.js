import React, {Component} from 'react';
import AceEditor from 'react-ace';
import {Icon, Tooltip, notification} from 'antd';
import copy from 'copy-to-clipboard';

import './Share.css';
import shareStyles from './Share.css';
import MenuTips from "./MenuTips";

import 'brace/mode/json'
import 'brace/theme/github';


class SourcePan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      showLineNum: true,
      tabSize: 2
    };
  }

  onChange(newValue) {
    this.setState({value: newValue});
    this.props.onChange(newValue);
  }

  doFormat() {
    let obj = JSON.parse(this.state.value);
    let newValue;
    let newTabSize;
    if (this.state.tabSize === 2) {
      newValue = JSON.stringify(obj, null, 4);
      newTabSize = 4;
    } else {
      newValue = JSON.stringify(obj, null, 2);
      newTabSize = 2;
    }
    this.setState({value: newValue, tabSize: newTabSize});
  }

  doCompress() {
    let obj = JSON.parse(this.state.value);
    let newValue = JSON.stringify(obj);
    this.setState({value: newValue});
  }

  doShowLineNum() {
    this.setState({showLineNum: !this.state.showLineNum});
  }

  doClean() {
    this.onChange('');
  }

  doCopy() {
    copy(this.state.value);
    let desc = this.state.value;
    desc = desc.substr(0, 200) + "......";
    notification.open({
      message: 'Copy Success',
      description: desc,
      icon: <Icon type="check" style={{color: '#2be92c'}}/>,
    });
  }

  render() {
    return (
      <div className={shareStyles.pan}>
        <div className={shareStyles.menu}>
          <Tooltip placement="bottom" title={<MenuTips text={'格式化'}/>}>
            <span onClick={this.doFormat.bind(this)}><Icon type="plus-circle-o"
                                                           className={shareStyles.menuIcon}/></span>
          </Tooltip>
          <Tooltip placement="bottom" title={<MenuTips text={'压缩'}/>}>
            <span onClick={this.doCompress.bind(this)}><Icon type="minus-circle-o"
                                                             className={shareStyles.menuIcon}/></span>
          </Tooltip>
          <Tooltip placement="bottom" title={<MenuTips text={'拷贝'}/>}>
            <span onClick={this.doCopy.bind(this)}><Icon type="copy" className={shareStyles.menuIcon}/></span>
          </Tooltip>
          <Tooltip placement="bottom" title={<MenuTips text={'显示行号'}/>}>
            <span onClick={this.doShowLineNum.bind(this)}><Icon type="bars" className={shareStyles.menuIcon}/></span>
          </Tooltip>
          <Tooltip placement="bottom" title={<MenuTips text={'清空'}/>}>
            <span onClick={this.doClean.bind(this)}><Icon type="delete" className={shareStyles.menuIcon}/></span>
          </Tooltip>
        </div>
        <div style={{height: '100%', overflow: 'scroll'}}>
          <AceEditor
            name="sourcePan"
            mode="json"
            theme="github"
            width="100%"
            height="100%"
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            showGutter={this.state.showLineNum}
            highlightActiveLine={false}
            showPrintMargin={false}
            wrapEnabled={true}
            editorProps={{$blockScrolling: true}}
            setOptions={{displayIndentGuides: false}}
            style={{fontFamily: 'menlo,monospace, Tahoma,"微软雅黑","幼圆"'}}
          />
        </div>
      </div>

    );
  }
}

export default SourcePan;
