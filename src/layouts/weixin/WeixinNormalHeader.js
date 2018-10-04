import React from 'react';
import {Affix, Layout} from 'antd';
import styles from './header.css';

const {Header} = Layout;
export default class WeixinNormalHeader extends React.Component {

  state = {
    account:{}
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    try {
      const loginAccountStr = sessionStorage.getItem("wxLoginAccount");
      console.log("loginAccountStr::", loginAccountStr);
      const loginAccount = JSON.parse(loginAccountStr);
      console.log("loginAccount->layout::", loginAccount);
      this.setState({account: loginAccount || {}});
    } catch (e) {
      console.log("出错啦：", e);
    }
  }

  render() {
    return (
      <Affix offsetTop={0} className={styles.affix}>
        <Header className={styles.mainHeader}>
          <div className={styles.headerContent}>
            <img src={require("../../assets/wx-logo.png")} className={styles.wxLogo} alt="LOGO"/>
            <div className={styles.userInfo}>
              <img src={this.state.account.avatarUrl} className={styles.accountAvator} alt="A"/>
              {this.state.account.nickname}
            </div>
          </div>
        </Header>
      </Affix>
    );
  }
}
