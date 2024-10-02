/*
 * @Author: Anixuil
 * @Date: 2024-10-02 14:43:57
 * @LastEditors: Anixuil
 * @LastEditTime: 2024-10-02 16:37:05
 * @Description: 请填写简介
 */
let chalk = null;
(async () => {
    chalk = (await import('chalk')).default;
})();

module.exports = {
    suc: (msg) => console.log(chalk.green.bold(`\n ${msg}\n`)),
    fail: (msg) => console.log(chalk.red.bold(`\n ❌   ${msg}\n`)),
    warn: (msg) => console.log(chalk.yellow.bold(`\n ⚠️   ${msg}\n`)),
    info: (msg) => console.log(chalk.blue.bold(`\n ${msg}\n`)),
};