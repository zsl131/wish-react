import React from 'react';
import {Form, Input, Modal, Switch} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
export default class UpdateModal extends React.Component {

  state = {
    obj: this.props.item,
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({reply: this.state.obj.reply, id: this.state.obj.id});
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;

    const handleOk = (e) => {
      e.preventDefault();
      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.status = values.status?"1":'0';
          this.props.onOk(values);
        }
      });
    }

    return(
      <Modal {...this.props} onOk={handleOk}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem label="评论者">
            {this.state.obj.nickname} 评论于：{this.state.obj.createTime}
          <div>{this.state.obj.content}</div>
          </FormItem>
          <FormItem label="回复内容">
            {getFieldDecorator('reply', {rules: [{required: true, message: '回复内容不能为空'}]})(<TextArea rows={3} placeholder="输入回复内容" />)}
          </FormItem>
          <FormItem label="是否显示">
            {getFieldDecorator("status")(<Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={this.state.obj.status === '1'}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
