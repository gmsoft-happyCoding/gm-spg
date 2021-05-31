import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Table, Tag, Form, Button, Icon, Popconfirm } from "antd";
import { ContentProps } from "search-page";
import { isNaN, isNil, clone } from "lodash";
import { currency, timeStampFormat, getValue, getSearch } from "@gmsoft/tools";
import { AutoText, Money, OperaterBtns } from '@gmsoft/ui';
import renderUtils from "./renderConf";

const { renderStatus } = renderUtils;

const { Column } = Table;

function Content(props: ContentProps) {
  const { data, forceUpdate, filters } = props;
  const onSubmit = useCallback((record) => {}, []);

  return (
    <Table dataSource={data.data} rowKey="id" pagination={false}>
      <Column
        width="20%"
        title="案件名称/区域"
        key="key1"
        render={(text, record: any) => (
          <>
            <AutoText>重庆张三某某案件</AutoText>
            <Tag color="blue">渝北区</Tag>
          </>
        )}
      />
      <Column
        width="20%"
        title="地点/受贿金额"
        key="key2"
        render={(text, record: any) => (
          <>
            <AutoText>重庆市某岔路口小胡同</AutoText>
            <Money>10000000</Money>
            <Tag color="magenta">建设中</Tag>
          </>
        )}
      />
      <Column
        width="20%"
        title="犯罪嫌疑人"
        key="key3"
        render={(text, record: any) => (
          <>
            <p>张三</p>
            <div>131110110110</div>
          </>
        )}
      />
      <Column
        width="15%"
        title="犯罪方式"
        key="key4"
        render={(text, record: any) => "作案未遂"}
      />
      <Column
        width="10%"
        title="状态"
        key="state"
        render={(text, record: any) => renderStatus(record)}
      />
      <Column
        width="15%"
        title="操作"
        key="key5"
        render={(text, record: any) => (
          <OperaterBtns>
            <Button type="link" onClick={() => onSubmit(record)}>
              判处死刑
            </Button>
          </OperaterBtns>
        )}
      />
    </Table>
  );
}

export default Content;
