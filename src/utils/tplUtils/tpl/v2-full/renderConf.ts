// 若找不到模块，请在当前项目任意位置执行命令：gm-spg gen 将在项目对应外置生成所需的渲染依赖，不需要的话请删除
import { generateRenderFn, StatusConf, StatusType } from '@/components/Status';

const typeMapper: StatusConf[] = [
  {
    // 状态映射文案
    statusText: '正常',
    // 状态值
    statusVal: 0,
    statusType: StatusType.STATUS_UNDERWAY,
  },
  {
    statusText: '无效',
    statusVal: 1,
    statusType: StatusType.STATUS_FAILED,
  },
  {
    statusText: '未知',
    // def为硬编码的未知状态
    statusVal: 'def',
    statusType: StatusType.STATUS_UNDONE,
  },
];

const renderFunctions = {
  // 此处泛型请传入列表中行数据的数据模型
  renderStatus: generateRenderFn<any>({
    // 上面的配置在此处应用
    statusMappers: typeMapper,
    // 使用列表项的哪一个字段进行状态映射，定义了此项后，导出的工具函数在使用时，可直接传入数据对象，样例：renderSupplyModel(record)
    getStatusVal: data => data.state,
    // 是否具备状态显示的附加Tag，颜色标识
    // hasPoint: false
  }),
};

export default renderFunctions;
