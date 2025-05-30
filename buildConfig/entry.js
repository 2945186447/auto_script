// 自动获取入口文件
const fs = require('fs');
const path = require('path');

const entryFiles = {};

const exclude = [
    'htx'
];

const filesList = fs.readdirSync(path.resolve(__dirname, '../src'));

console.log(exclude);


for (let i = 0, count = filesList.length; i < count; i++) {
    const file = filesList[i];
    if (exclude.includes(file)) {
        const filePath = path.resolve(__dirname, `../src/${file}/main.ts`);
        entryFiles[file] = filePath;
    }
}

module.exports = entryFiles;
