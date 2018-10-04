// 推荐活动
import React from 'react';
import {connect} from 'dva';
import IconText from './IconText';
import Link from 'umi/link';
import styles from './recommendActivity.css';

class RecommendActivity extends React.Component {

  state = {
    length : this.props.length || 10,
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({type: 'recommendActivity/listRecommend', payload: {length: this.state.length}});
  }

  render() {

    const SingleActivity = ({item}) => {
      return (
        <div className={styles.singleActivity} key={item.id}>
          <div className={styles.img}>
            <Link to={`/wx/activity/show?id=${item.id}`} className={styles.titleHref}><img src={item.imgUrl} alt="Logo"/></Link>
          </div>
          <div className={styles.content}>
            <p><Link to={`/wx/activity/show?id=${item.id}`} className={styles.titleHref}>{item.title}</Link></p>
            <p className={styles.showDate}>
              <IconText type="eye-o" text={item.readCount}/>，<IconText type="like-o" text={item.goodCount} />，<IconText type="message" text={item.commentCount} />
            </p>
          </div>
        </div>
      );
    }

    return(
      <div>
        {
          this.props.recommendActivity.activityList.map((item)=> {
            return (
              <div key={item.id}>
                <SingleActivity item={item} key={item.id}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default connect(({recommendActivity}) => ({recommendActivity}))(RecommendActivity);
