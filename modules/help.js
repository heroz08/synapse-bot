// 帮助文档说明
// hp, help, 帮助, bz, bangzhu

export default function help (...args) {
    const [instruction, ...params] = args;
    const strs = [];
    instruction.forEach(item => {
        const { action, keys = [], params = [], desc = '' } = item;
        if (action !== 'help.js') {
            const keyStr = '  ' + desc + '关键词：' + keys.join(' | ');
            const paramStr = '  ' + desc + '参数：' + (params || []).map(p => {
                if (p.includes('?')) {
                    return '(可选)' + p.slice(1);
                }
                return p;
            }).join(' | ');
            const str = `${keyStr}\n${paramStr}`;
            strs.push(str);
        }
    });
    return strs.join('\n');
}
