#!/usr/bin/env node

const { program } = require('commander');
const packageInfo = require('../../package.json');
const fs = require('fs');
const path = require('path');
const tip = require('../tip');

program.version(packageInfo.version)

program
    .command('create <app-name>') // fe init
    .description('create a new ani-project')
    .action((name) => {
        // 判断是否存在同名文件夹
        const targetDir = path.join(process.cwd(), name);
        console.log('targetDir', targetDir);

        if (fs.existsSync(targetDir)) {
            tip.fail(`Error: Directory ${templateName} already exists. Please choose another name.`);
            process.exit(1);
        }
        require('../cmd/init')(name);
    });

// program
//     .command('add') // fe add
//     .description('添加新模板')
//     .alias('a') // 简写
//     .action(() => {
//         require('../cmd/add')();
//     });

program
    .command('list') // fe list
    .description('查看可生成的模板')
    .alias('ls') // 简写
    .action(() => {
        require('../cmd/list')();
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help()
}