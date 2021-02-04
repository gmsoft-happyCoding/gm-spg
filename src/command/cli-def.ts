import { program } from "commander";
import writeDefaultTpl from "@/process/writeDefaultTpl";
import projectConf from "@/conf/project.conf";
import { TplType } from "@/types/TpleType.enum";

program
  .command("def [moduleName] [tplVersion]")
  .description("创建SearchPage默认模板")
  .usage(
    `[moduleName] [tplVersion]\r\n
    moduleName：模块名，如：ContractManage，将应用于入口文件的文件名\r\n
    tplVersion：模板文件的版本号，如需要指明生成的版本，则传入对应版本号，大部分情况下不需要指定`
  )
  .action(
    (
      moduleName: string = TplType.TYPE_ENTRANCE,
      tplVersion: string = "latest"
    ) => {
      writeDefaultTpl(
        moduleName,
        // 如果版本为latest，则获取配置中配置的最新的版本号
        // TODO 后续改为自动识别最新的版本，而不是通过配置写死最新的版本是什么
        tplVersion === "latest" ? projectConf.tplLatestVersion : tplVersion
      );
    }
  );
