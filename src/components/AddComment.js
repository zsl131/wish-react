import React from 'react';
import {Button, Card, NoticeBar, TextareaItem, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {getLoginAccount} from '../utils/loginAccountUtils';
import styles from './addComment.css';

/**
 * 此组件用于发表评论
 * 所有参数：
 * objId：被评论的对象Id
 * onOk: 当评论被提交时的回调函数
 */
@createForm()
export default class AddComment extends React.Component {

  state = {
    objId: this.props.objId,
    loginAccount: {},
    content:'',
  }

  UNSAFE_componentWillMount() {
    const loginAccountStr = getLoginAccount();
    const loginAccount = loginAccountStr?JSON.parse(loginAccountStr):{};

    // this.state.loginAccount = loginAccount;
    this.setState({loginAccount: loginAccount});
  }

  render() {
    let opts = {
      rows: 3,
      placeholder: "请输入评论内容",
      count: 200,
    }

    const { getFieldProps, validateFields, setFieldsValue } = this.props.form;

    Object.assign(opts, this.props.opts || {});

    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        if(!errors) {
          values.openid = this.state.loginAccount.openid;
          values.objId = this.props.objId; //TODO 需要父组件提供objId属性
          this.props.onSubmit(values); //TODO 提交，需要父组件提供onSubmit方法
          setFieldsValue({content: ''});
          this.setState({content: ''});
        } else {
          Toast.fail("请认真输入评论内容");
        }
      });
    }

    const TitleObj = ({title}) => {
      return (
        <span>
          <img src={this.state.loginAccount.avatarUrl} className={styles.commentImg} alt="A"/>{title}
        </span>
      )
    }

    const handleChange = (val) => {
      setFieldsValue({content: val});
      this.setState({content: val});
    }

    return (
      <div>
        {this.state.loginAccount?
          <Card style={{"margin": "10px"}}>
            <Card.Header title={<TitleObj title="发表评论"/>}/>
            <Card.Body>
              <TextareaItem
                {...getFieldProps('content', {rules: [{required: true, message: '请认真输入评论内容'}]})}
                autoHeight
                labelNumber={4} {...opts}
                onChange={handleChange}/>
            </Card.Body>
            <Card.Footer extra={<Button type="primary" size="small" onClick={handleSubmit} disabled={this.state.content===''} inline>提交评论</Button>}/>
          </Card>:
          <NoticeBar>未检测到登陆用户，不可评论</NoticeBar>
        }
      </div>
    );
  }
}
