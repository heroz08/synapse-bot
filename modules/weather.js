// 获取天气
// tq, 天气
// ?localName---地点名称
import axios from 'axios';

export default async function getWeather (...args) {
    const query = args[0];
    const { location, address } = query ? await getLonAndlat(query || null) : {};
    // 海淀经纬度
    const lat = '39.95607';
    const lon = '116.31031';
    const finallyLocation = location || (lon + ',' + lat);

    const key = 'da22dd2ce3c4459798e6a5eeef0f6dce';
    const url = 'https://devapi.qweather.com/v7/weather/now';
    const rainUrl = 'https://devapi.qweather.com/v7/minutely/5m';
    const data = {
        key, location: finallyLocation
    };
    const base = axios.get(url, { params: data });
    const rain = axios.get(rainUrl, { params: data });
    const ps = [base, rain];

    return await Promise.all(ps).then(resps => {
        const [baseResp, rainResp] = resps;
        const { data } = baseResp || {};
        const { temp, text, windDir, windScale } = data.now;
        const { data: rainData } = rainResp || {};
        const { summary } = rainData || {};
        const str = `${address || query || '海淀'} 当前天气：${temp}°C ${text} ${windDir}${windScale}级 ${summary}`;
        return str;
    });
}

async function getLonAndlat (local) {
    const location = local || '北京';
    const key = '0b70f42d0e6cb49eb6027e781f66c737';
    const url = 'https://restapi.amap.com/v3/geocode/geo';
    const params = {
        key, address: location
    };
    const { data } = await axios.get(url, { params });
    const { status, info, geocodes = [] } = data || {};
    if (status === '1' && info === 'OK') {
        const { location, formatted_address } = geocodes[0] || {};
        return { location, address: formatted_address };
    }
    return {};
}
