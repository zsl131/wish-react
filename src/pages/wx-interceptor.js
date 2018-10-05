//  此文件会自动运行，不需要在其他地方引入

// 此文件主要功能是解决无微信用户登录的问题
import {decodeBase64, encodeBase64} from "../utils/Base64Utils";
import {getLoginAccount, setLoginAccount} from '../utils/loginAccountUtils';

const curPathname = window.location.pathname;

// console.log("wx-interceptor document ---- "+window.location.pathname, window.location.href);

///weixin/queryAccount此路由临时使用，用于缓存微信用户
if(curPathname.startsWith("/wx") && curPathname !== '/weixin/queryAccount') {

  // const laStr = localStorage.getItem(LOGIN_WX_ACCOUNT_SESSION_NAME);
  const laStr = getLoginAccount();

  // console.log("loginAccountStr session:::", laStr);

  if (laStr === null) { //表示没有Account
    // const query = getRequest();

    const account = getQueryString("account"); //检测参数中是有account

    // console.log("loginAccountStr::", account);

    if (account !== null && account !== undefined) {
      const targetUrl = decodeBase64(getQueryString("targetUrl"));
      // console.log("targetUrl::" + targetUrl);
      // console.log("targetUrl::" + decodeBase64(account));
      const loadAccount = JSON.parse(decodeBase64(account));
      // console.log("loadAccount:"+loadAccount)
      if (loadAccount.size === 1) {
        // localStorage.setItem(LOGIN_WX_ACCOUNT_SESSION_NAME, JSON.stringify(loadAccount.datas));
        setLoginAccount(JSON.stringify(loadAccount.datas));
        // console.log(loadAccount);
        window.location.href = targetUrl;
      } else {
        console.log("没有获取微信用户，需要跳转到关注页面");
      }
      // window.location.href = targetUrl;
    } else {
      window.location.href = "/wxRemote/queryAccount?targetUrl=" + encodeBase64(encodeURIComponent(window.location.href));
    }
  }
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2]; return null;
}
