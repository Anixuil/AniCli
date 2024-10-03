'use strict'
// 操作命令行
const exec = require('child_process').exec;
const co = require('co');
let ora,spinner = null;
(async () => {
    ora = (await import('ora')).default;
    spinner = ora('正在生成...');
})();
const prompt = require('co-prompt');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const tip = require('../tip.js');
const templates = require('../../template.json');


const execRm = (err, projectName) => {
    spinner.stop();

    if (err) {
        console.log(err);
        tip.fail('请重新运行!');
        process.exit();
    }

    tip.suc('Project init successfully! \n Welcome to use ani-cli!');
    tip.info(`cd ${projectName} \n npm install`);
    process.exit();
};

const download = (err, projectName) => {
    if (err) {
        console.log(err);
        tip.fail('Please check warning above and try again!');
        process.exit();
    }
    // 删除 git 文件
    exec(`cd ${projectName} && rmdir /s /q .git`, (err, out) => {
        execRm(err, projectName);
    });
}

const resolve = (result) => {
    const { templateName, url, branch, projectName } = result;
    // git命令，远程拉取项目并重命名项目文件夹
    const cmdStr = `git clone ${url}${templateName}.git ${projectName} && cd ${projectName}`;

    spinner.start();

    exec(cmdStr, (err) => {
        download(err, projectName);
    });
};

const selectTemplate = () => {
    const question = [
        {
            type: 'list',
            name: 'templateName',
            message: '请选择模板',
            choices: Object.keys(templates),
        }
    ]

    return inquirer.prompt(question);
}

module.exports = (projectName) => {
    co(function* () { 
        // 多选，选择模板
        const { templateName } = yield selectTemplate();

        if (!templates[templateName]) {
            tip.fail('模板不存在!');
            process.exit();
        }
        // 判断是否存在同名文件夹，如果存在提示已存在
        const targetDir = path.join(process.cwd(), templateName);
        console.log('targetDir', targetDir);

        if (fs.existsSync(targetDir)) {
            tip.fail(`Error: Directory ${templateName} already exists. Please delete it first.`);
            process.exit(1);
        }
        return new Promise((resolve, reject) => {
            resolve({
                projectName,
                templateName,
                ...templates[templateName],
            });
        });
    }).then(resolve);
}
