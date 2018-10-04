import React from 'react';
import { connect } from 'dva';
import {Alert, Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css';

const Index = ({
  loading,
 adminIndex
}) => {

  // console.log(adminIndex);

  const alertMessage = ()=> {
    return (
      <div className={styles.panel}><p>有<b> {adminIndex.noConfigTemplateMessage.length} </b>条模板消息需要配置：</p>
        {adminIndex.noConfigTemplateMessage.map((item, index)=> (<p className={styles.contentP} key={index}>{item.name}：{item.rules}</p>))}
        <p><Link to="/admin/templateMessageRelation"><Button type="primary" icon="setting">前去配置</Button></Link></p>
      </div>
    );
  }

  const scoreMessage = () => {
    return (
      <div className={styles.panel}>
        <p>有<b> {adminIndex.noConfigScore.length} </b>条积分规则需要配置：</p>
        {adminIndex.noConfigScore.map((item, index)=> (<Button type="dashed" className={styles.scoreBtn} key={index}>{item}</Button>))}
        <p><Link to="/admin/scoreRule"><Button type="primary" icon="setting">前去配置</Button></Link></p>
      </div>
    );
  }

  // console.log(alertMessage());

  return (
    <div style={{"padding":"15px"}}>
      <h2>· 后台首页</h2>
      {adminIndex.noConfigTemplateMessage && <Alert className={styles.singleAlert} type="error" message={alertMessage()} showIcon />}
      {adminIndex.noConfigScore && <Alert className={styles.singleAlert} type="error" message={scoreMessage()} showIcon />}
    </div>
  );
}

export default connect(({ loading, adminIndex }) => ({ loading, adminIndex }))(Index);
