import React, { useMemo } from 'react';
import { clone } from 'lodash';
import creatSearchPage, { Filters, GetDataApi, PaginationI } from 'search-page';
// TODO 修改API引入
import { api as API } from '@/api';
import { notification } from '@gmsoft/ui';
import FilterForm from './FilterForm';
import Content from './Content';

export interface Props {}

const getDataApi: GetDataApi = async (filters: Filters, pagination: PaginationI) => {
  const filterPayload = clone(filters);

  filterPayload.pageNo = pagination.current;
  filterPayload.pageSize = pagination.pageSize;

  try {
    // TODO 修改调用API
    const { data } = await API.xxxxxxxx({
      params: filterPayload,
    });
    // TODO 确认接口返回数据结构
    return { data: data.data, total: data.meta.totalCount };
  } catch (error) {
    notification.error({
      message: '错误',
      description: `获取数据失败:${error.message}`,
    });
    return { data: [], total: 0 };
  }
};

function ###moduleName###(props: Props) {
  const SearchPage = useMemo(
    () =>
      creatSearchPage({
        FiltersForm: FilterForm,
        getDataApi,
        hideOnSinglePage: false,
      }),
    []
  );

  return <SearchPage>{Content}</SearchPage>;
}

export default ###moduleName###;
