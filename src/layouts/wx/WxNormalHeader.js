import React from 'react';
import styles from './header.css';
import { NavBar, Icon } from 'antd-mobile';
import WxLoginAccount from './WxLoginAccount';
import configApi from "../../utils/configApi";
import Helmet from 'react-helmet';

export default class WxNormalHeader extends React.Component {

  render() {
    return (

      <NavBar
        mode="dark"
        leftContent={[<Icon key="2" type="left"/>]}
        onLeftClick={()=>window.history.back()}
        className={styles.templateNavBar}
        rightContent={[
          <WxLoginAccount key="0" style={{ marginRight: '16px' }} />,
        ]}
      >

        <Helmet><title>{configApi.appName} - 微信平台</title></Helmet>
        <div className={styles.headerContent}>
          <img src={require("../../assets/wx-logo.png")} className={styles.wxLogo} alt="LOGO"/>
        </div>
      </NavBar>
    );
  }
}
