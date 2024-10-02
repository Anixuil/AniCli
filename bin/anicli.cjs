#!/usr/bin/env node

require('../lib/cli/');
// const { program } = require('commander');
// const create = require('../lib/create');
// program
//     .command('create <app-name>')
//     .description('create a new project')
//     .option('-f -force', 'overwrite target directory if it exists')
//     .action((name, cmd) => {
//         // 执行自己封装的创建方法
//         create(name, cmd)
//     });
// program
//     .on('--help', () => {
//         console.log('');
//         console.log(`Run ${chalk.cyan('anicli <command> --help')} show details`);
//         console.log('');
//     });
// // program.parse(process.argv);