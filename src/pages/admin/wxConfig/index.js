import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Card, Button, Input } from 'antd';
import { routerRedux } from 'dva/router';

import styles from './index.css';

const FormItem = Form.Item;

@Form.create()
class WxConfig extends React.Component {

  state = {
    item: this.props.wxConfig.item,
  }

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    // console.log("didMount::", this.props.wxConfig.item);
    // setFieldsValue(this.state.item || {});
    // console.log(this.props.wxConfig.item);
    setFieldsValue(this.props.wxConfig.item);
  }

  render() {

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

    const {validateFieldsAndScroll, getFieldDecorator} = this.props.form;

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
          this.props.dispatch({ type: 'wxConfig/save', payload: values }).then(()=>{handleRefresh()});
        }
      });
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="edit"/> 微信配置管理</h3>
        </div>
        <div className={styles.mainContainer}>
          <Card>
            <Form onSubmit={handleOk} layout="horizontal" loading={this.props.loading.models.wxConfig}>
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              <FormItem {...formItemLayout} label="URL">
                {getFieldDecorator('url', {rules: [{required: true, message: 'URL不能为空'}]})(<Input placeholder="输入URL"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="appid">
                {getFieldDecorator('appid', {rules: [{required: true, message: 'appID不能为空'}]})(<Input placeholder="输入appID"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="Token">
                {getFieldDecorator('token', {rules: [{required: true, message: 'Token不能为空'}]})(<Input placeholder="输入Token"/>)}
              </FormItem>

              <FormItem {...formItemLayout} label="appsecret">
                {getFieldDecorator('secret', {rules: [{required: true, message: 'appsecret不能为空'}]})(<Input placeholder="输入appsecret"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="aesKey">
                {getFieldDecorator('aeskey', {rules: [{required: true, message: 'aeskey不能为空'}]})(<Input placeholder="输入aeskey"/>)}
              </FormItem>
              <FormItem {...formItemLayout} label="事件模板ID">
                {getFieldDecorator('eventTemp')(<Input placeholder="输入事件模板ID"/>)}
              </FormItem>

              <FormItem className={styles.submitOper}>
                <Button className={styles.submitBtn} htmlType="submit" type="primary" icon="check">提交保存</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(({ wxConfig, loading }) => ({ wxConfig, loading }))(WxConfig);
