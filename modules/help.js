// 帮助文档说明
// hp, help, 帮助, bz, bangzhu

export default function help (...args) {
    const [instruction] = args;
    const strs = [];
    instruction.forEach(item => {
        const { action, keys = [], params = [], desc = '' } = item;
        if (action !== 'help.js' && keys.length) { // 排除没有keys的文件
            const keyStr = '  ' + desc + '关键词：' + keys.join(' | ');
            const paramStr = '  ' + desc + '参数：' + (params || []).map(p => {
                if (p.includes('?')) {
                    return '(可选)' + p.slice(1);
                }
                return p;
            }).join(' | ');
            const str = `\n${keyStr}\n${paramStr}`;
            strs.push(str);
        }
    });
    return strs.join('\n');
}
