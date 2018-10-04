import React from 'react';
import {Button,Flex} from 'antd-mobile';
import styles from './weixin-page.css'
import { routerRedux } from 'dva/router'

export default class WeixinPage extends React.Component {

  state = {
    canNext: false,
    canPre: false,
    curPage: 0,
    content:''
  }

  componentDidMount() {
    this.setButton(0);
  }

  setButton(nextPage) {
    //console.log(location.query)
    //const { query } = this.props.location;
    //const curPage = query.page?parseInt(query.page):0;
    // const curPage = this.state.curPage;
    // console.log("currentPage::"+curPage+"===nextPage::"+nextPage)
    // this.setState({curPage: curPage})
    const totalPage = this.props.totalPage;
    // console.log(curPage+"/"+totalPage, curPage>=1)
    this.setState({canNext: (totalPage-nextPage)>1, canPre: nextPage>=1, content: (nextPage+1)+' / '+totalPage})
  }

  render() {
    const totalPage = this.props.totalPage;
    const { query, pathname } = this.props.location;

    const handleRefresh = (newQuery) => {
      this.props.dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          ...newQuery,
        },
      }));
    }

    const handlePage = (flag) => {
      const curPage = query.page?parseInt(query.page):0;

      let nextPage = curPage + (flag===1?1:-1);
      if(nextPage<0) {nextPage = 0;}
      else if(nextPage>totalPage-1) {nextPage = totalPage -1;}

      handleRefresh({page: nextPage});
      this.setState({curPage: nextPage});
      this.setButton(nextPage);
    }

    return (
      <div className={styles.pageMain}>
        <Flex>
          <Flex.Item><Button disabled={!this.state.canPre} onClick={()=>handlePage(-1)}>上一页</Button></Flex.Item>
          <Flex.Item><span className={styles.pageCon}>{this.state.content}</span></Flex.Item>
          <Flex.Item><Button disabled={!this.state.canNext} onClick={()=>handlePage(1)}>下一页</Button></Flex.Item>
        </Flex>
      </div>
    );
  }
}
