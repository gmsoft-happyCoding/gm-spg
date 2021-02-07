import fs from "fs";
import fsex from "fs-extra";
import path from "path";
import prettier from "prettier";
import { get, forIn, camelCase, upperFirst } from "lodash";
import { InterfaceDescI, ProjectDesc } from "@/types/InterfaceDesc";
import { ListAttrDesc } from "@/types/ListAttrDesc";
import { getProjectRoot } from "@/utils/tplUtils";
import { getCurrentTime } from "@/utils/timeUtils";
import { myErrorLog, myInfoLog, myWarnLog } from "@/utils/logUtils";

const fsp = fs.promises;

function getInterfaceName(info: InterfaceDescI): string {
  const namePattern = /\/([a-zA-Z\-\d]+)\/([a-zA-Z\-\d]+)$/;
  const name1 = info.path.match(namePattern)![1];
  const name2 = info.path.match(namePattern)![2];
  return upperFirst(`${name1}${upperFirst(camelCase(name2))}`);
}

function getAttrDesc(attrInfo: ListAttrDesc) {
  let { type } = attrInfo;
  if (
    ["integer", "long", "number"].includes(type) ||
    attrInfo.format === "date-time"
  ) {
    type = "number | string";
  }

  return `
  /** ${attrInfo.description} */
    ${attrInfo.key}: ${type};`;
}

function getInterfaceContent(
  interfaceName: string,
  desc: InterfaceDescI
): string {
  const properties = get(
    desc,
    "responseModel.200.schema.properties.data.items.properties"
  );
  const items: ListAttrDesc[] = [];
  forIn(properties, (val, key) => {
    items.push({
      ...val,
      key,
    });
  });
  const interfaceDescStr = get(desc, "desc", "无描述");

  const interfaceContent = `/** ${interfaceDescStr} 
  * @uri ${desc.path}
  * create by gm-spg CLI @ ${getCurrentTime()}
  */
  export interface ${interfaceName}I {${items
    .map((item) => getAttrDesc(item))
    .join("")}
  }
`;
  return prettier.format(interfaceContent, { semi: true, parser: "babel" });
  // try {
  //   return prettier.format(interfaceContent, { semi: true, parser: "babel" });
  // } catch (error) {
  //   myWarnLog(`Prettier格式化异常，${desc.path}`, error);
  //   return interfaceContent;
  // }
}

async function writeGroupApi(
  typesDirPath: string,
  interfaceDescs: InterfaceDescI[],
  cover: boolean
) {
  interfaceDescs.map(async (desc) => {
    try {
      const interfaceName = getInterfaceName(desc);
      const filePath = path.join(typesDirPath, `${interfaceName}.d.ts`);
      // 如果是覆盖模式或文件不存在，则写出
      if (cover || !fs.existsSync(filePath)) {
        myInfoLog(`Generate process --> ${filePath}`);
        await fsp.writeFile(filePath, getInterfaceContent(interfaceName, desc));
        return;
      }
      myWarnLog(
        `Generate process --> 接口已存在，跳过：${desc.path} \r\n ${filePath}`
      );
    } catch (error) {
      myErrorLog(
        `Generate process --> 接口生成异常，跳过：${desc.path}`,
        error
      );
    }
  });
}

export async function writeInterface(
  projectsDesc: ProjectDesc,
  cover: boolean
) {
  try {
    const projectRoot = getProjectRoot(process.cwd());
    if (!projectRoot) {
      throw new Error("未定位到项目根目录！");
    }
    const typesDir = path.resolve(projectRoot, "./src/types/spg-type");
    // 不存在目录则创建
    if (!fs.existsSync(typesDir)) {
      fsex.mkdirSync(typesDir);
    }
    const projectIds = Object.keys(projectsDesc);
    const allTask = projectIds.map((projectId) =>
      writeGroupApi(typesDir, projectsDesc[projectId], cover)
    );
    await Promise.all(allTask);
  } catch (error) {
    myErrorLog(error.message);
  }
}
