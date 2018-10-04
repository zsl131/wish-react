import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

export default class WeixinNormalFooter extends React.Component {

  render() {
    return (
      <Footer>
        <p>Copyright &copy; 51玩科学, 滇ICP备15005159号-3</p>
      </Footer>
    );
  }
}
