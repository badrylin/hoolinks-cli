/*
 * @Author: linzeqin
 * @Date: 2021-04-27 09:08:43
 * @description: 生产环境
 */
import { llog } from "./utils/logs";
import { CliMain } from "./webpack";

export const run = () => {
    CliMain.compiler.run((err, stats) => {
        if (err) {
            llog('error--'+ err.message, "red");
            process.exit(5)
        }

        const info = stats.toJson({
            colors: true,
        });

        if (stats.hasErrors()) {
            info.errors.forEach((item, index) => {
                llog('stats-'+(index+1)+'-' + item.message, "red");
            });
            process.exit(3)
        }

        if (stats.hasWarnings()) {
            info.warnings.forEach((item) => {
                llog(item.message, "yellow");
            });
        }
        /** close */
        CliMain.compiler.close(err => {
            err && llog(err, "red");
        });
    })
}
