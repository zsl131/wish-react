import React from 'react';
import {Button, Form, Input,Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Filter = ({
  onFilter,
  form: {
    getFieldDecorator,
    validateFields,
  }
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((errors, values) => {
      // console.log("filter", errors, values);
      onFilter(values);
    });
  }

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator("status")(
          <Select placeholder="状态" style={{ width: '100px' }}>
            <Option key="*">=全部=</Option>
            <Option key="1">显示</Option>
            <Option key="0">隐藏</Option>
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator("content_like")(<Input placeholder="评论内容"/>)}
      </FormItem>
      <FormItem>
        {getFieldDecorator("reply_like")(<Input placeholder="回复内容"/>)}
      </FormItem>
      <FormItem>
        <Button type="dashed" htmlType="submit">筛选</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Filter);
