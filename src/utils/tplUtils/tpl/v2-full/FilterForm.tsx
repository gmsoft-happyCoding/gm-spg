import React from 'react';
import { Input, Select } from 'antd';
import { FiltersFormType, FormWrapper } from 'search-page';
import { RangePicker } from 'datepicker-of-antd';
import GmsoftComponent from '@/components/GmsoftComponent';

export interface Props {}

const { FormItem } = FormWrapper;
const { Option } = Select;

const FilterForm: FiltersFormType = props => {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <FormWrapper {...props} simpleMode={{ count: 3 }}>
      <FormItem label="输入类型">
        {getFieldDecorator('inputType')(<Input placeholder="请输入" allowClear />)}
      </FormItem>
      <FormItem label="选择类型">
        {getFieldDecorator('selectType')(
          <Select placeholder="请选择" allowClear>
            <Option value="1">Option-1</Option>
            <Option value="2">Option-2</Option>
          </Select>
        )}
      </FormItem>
      <FormItem label="远程组件">
        {getFieldDecorator('effectAreaId')(
          <GmsoftComponent
            componentName="AreaSelect"
            placeholder="请输入区域"
            hideVirtualNodes
            useDefaultFilterOption
            allowClear
          />
        )}
      </FormItem>
      <FormItem label="时间组件">
        {getFieldDecorator('signupTime')(
          <RangePicker placeholder={['请选择开始时间', '请选择结束时间']} />
        )}
      </FormItem>
    </FormWrapper>
  );
};

export default FilterForm;
