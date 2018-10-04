import React from 'react';
import {Button, Form, Input} from 'antd';
import styles from '../index.css';
import {getLoginUser} from "../../../../utils/authUtils";

const FormItem = Form.Item;

@Form.create()
export default class BindPhone extends React.Component {

  state = {
    loginUser:{},
    canGetCode:false,
    btnName: "获取验证码",
    timer:null
  }

  componentDidMount() {
    const loginUser = getLoginUser();
    const {setFieldsValue} = this.props.form;
    setFieldsValue({id:loginUser.id, phone:loginUser.phone});
    this.setState({
      loginUser: loginUser
    })
  }

  onClick = () => {
    const {getFieldValue} = this.props.form;
    const phone = getFieldValue("phone");
    // console.log(phone)
    this.props.sendcode(phone);
    let second = 20;
    const that = this;
    const timer = setInterval(() => {
      that.setState({btnName: second+"s后重试"});
      if(second<=0) {
        that.setState({canGetCode:true, btnName: "重获验证码", timer: null});
        clearInterval(timer);
      }
      second--;
    }, 1000)
    this.setState({timer: timer, canGetCode: false});
  }

  changePhone = (e) => {
    const value = e.target.value;
    if(value.length>=11) {
      e.target.value = value.substring(0,11);
      this.setState({canGetCode: true})
    } else {
      this.setState({canGetCode: false})
    }
  }

  render() {
    const {validateFieldsAndScroll, getFieldDecorator} = this.props.form;

    console.log(this.props)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          this.props.dispatch({ type: 'userPwd/updatePwd', payload: values });
        }
      });
    }

    return (
      <div>
        <Form onSubmit={handleOk} layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}

          <FormItem {...formItemLayout} label="手机号码">
            {getFieldDecorator('phone', {rules: [{required: true, message: '手机号码不能为空'}]})(<Input type="number" onChange={this.changePhone} maxLength={11} placeholder="输入手机号码"/>)}
          </FormItem>

          <FormItem {...formItemLayout} label="短信验证码">
            {getFieldDecorator('code', {rules: [{required: true, message: '短信验证码不能为空'}]})(
              <Input placeholder="输入收到的验证码"
                     maxLength={4}
                     addonAfter={<Button size="small" disabled={!this.state.canGetCode} onClick={this.onClick}>{this.state.btnName}</Button>}/>
            )}
          </FormItem>

          <FormItem className={styles.submitOper}>
            <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
