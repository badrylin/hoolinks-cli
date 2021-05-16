/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:43
 * @description: 生产环境
 */
import { llog } from "./utils/logs";
import { CliMain } from "./webpack";

export default () => {
    CliMain.compiler.run((err, stats) => {
        if (err) {
            llog(err.message, "red");
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            info.errors.forEach((item) => {
                llog(item.message, "red");
            });
        }

        if (stats.hasWarnings()) {
            info.warnings.forEach((item) => {
                llog(item.message, "yellow");
            });
        }

    })
}
