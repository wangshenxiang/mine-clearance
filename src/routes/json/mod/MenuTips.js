import React, {Component} from 'react';

class MenuTips extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <span style={{fontSize:10}}>{this.props.text}</span>
    );
  }
}

export default MenuTips;
