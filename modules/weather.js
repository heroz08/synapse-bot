// tq, 天气, 下雨, xy
import axios from 'axios';

export default async function getWeather () {
    const key = 'da22dd2ce3c4459798e6a5eeef0f6dce';
    const lat = '39.95607';
    const lon = '116.31031';
    const url = 'https://devapi.qweather.com/v7/weather/now';
    const rainUrl = 'https://devapi.qweather.com/v7/minutely/5m';
    const data = {
        key, location: lon + ',' + lat
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
        const str = `海淀当前天气：${temp}°C ${text} ${windDir}${windScale}级 ${summary}`;
        return str;
    });
}
