export default function now (format) {
    const date = new Date();
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const H = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const obj = {
        Y, M, D, H, m, s
    };
    const mat = format || 'Y-M-D H:m:s';
    if (mat) {
        const arr = mat.split('');
        let result = '';
        arr.forEach(a => {
            result += obj[a] || a;
        });
        return result;
    }
}
