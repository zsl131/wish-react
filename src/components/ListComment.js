import React from 'react';
import {List, Button,Pagination} from 'antd-mobile';
import {Icon} from 'antd';
import TimeAgo from './TimeAgo';
import styles from './listComment.css';
import {getOpenid} from '../utils/loginAccountUtils';

export default class ListComment extends React.Component {

  render() {
    const titleShow = (this.props.title?this.props.title:"评论列表") + "（"+this.props.totalElements+"）";

    const ClickGood = ({objId, count}) => {
      return (
        <Button inline size="small" type="dashed" onClick={()=>this.props.onGood(objId)}><Icon type="like"/> {count}</Button>
      );
    }

    const handleChangePage = (page) => {
      this.props.onChangePage({openid: getOpenid(), page: page-1});
      // this.handleChangePage(page);
    }

    return (
      <div>
        <List renderHeader={()=>titleShow}>
          {
            this.props.dataSource.map((item)=> {
              return (
                <List.Item
                  key={item.id}
                  thumb={item.avatarUrl}
                  multipleLine
                  wrap
                  extra={<ClickGood objId={item.id} count={item.goodCount}/>}
                  align="top"
                >
                  <p>{item.content}</p>
                  {item.reply && <p className={styles.reply}>{item.reply}</p>}
                  <List.Item.Brief>{item.nickname} <TimeAgo timeLong={item.createLong}/></List.Item.Brief>
                </List.Item>
              );
            })
          }
        </List>
        <div className={styles.page}>
          <Pagination total={this.props.totalPage}
                      className="custom-pagination-with-icon"
                      onChange={handleChangePage}
                      current={this.props.curPage}
                      locale={{
                        prevText: (<span className="arrow-align"><Icon type="left" />上一页</span>),
                        nextText: (<span className="arrow-align">下一页<Icon type="right" /></span>),
                      }}/>
        </div>
      </div>
    );
  }
}
