// 电影
// dy, 电影
// ?id---电影id 例如（dy 1 2 3）


import axios from 'axios';
import * as cheerio from 'cheerio';
import { now, readAndSave, readFile } from '../utils/index.js';
import iconv from 'iconv-lite';
import { Base64 as base64 } from 'js-base64';

const base = 'https://www.dydytt.net';
const dirPath = '../data/movie.json';
const baseDir = import.meta.url;
export default async function movie(...args) {
  if (args.length) { // 有参数
    const data = await readFile(baseDir, dirPath);
    const obj = JSON.parse(data.toString());
    const currents = getCurrents(args, obj);
    const magnetList = await getDetails(currents);
    return createDownload(magnetList);
  } else { // 无参数
    const list = await openPage();
    const strs = list.map(li => {
      const { id, title, text } = li;
      return `${id}\n${title}`;
    });
    const str = strs.join('\n\n');
    const day = now('YMD');
    const obj = {};
    obj[day] = list;
    const flag = await readAndSave(baseDir, dirPath, obj);
    if (flag) {
      console.log('电影数据保存成功');
    }
    return str;
  }
}

async function openPage(url) {
  const resp = await axios.get(url || 'https://www.dydytt.net/html/gndy/dyzz/index.html', {
    responseType: 'arraybuffer'
  });
  const $ = cheerio.load(iconv.decode(resp.data, 'gbk'));
  const content = $('.co_area2 .co_content8 ul').children();
  const len = content.length;
  const contents = [];
  for (let i = 0; i < len; i++) {
    const table = content[i];
    const tbody = cheerio.load(table)('tbody');
    const trs = tbody.children();
    const titleEle = cheerio.load(trs[1])('td b a');
    const textEle = cheerio.load(trs[3])('td');
    const title = cheerio.text(titleEle);
    const href = titleEle.attr('href');
    const id = href.match(/[0-9]+\./)?.[0].slice(0, -1);
    const contentText = cheerio.text(textEle);
    const obj = {
      id, title: decodeURI(title), href, text: decodeURI(contentText)
    };
    contents.push(obj);
  }
  return contents;
}

function getCurrents(ids, obj) {
  const currents = [];
  ids.forEach(id => {
    const values = Object.values(obj);
    const len = values.length;
    for (let i = 0; i < len; i++) {
      const item = values[i];
      const itemlen = item.length;
      for (let j = 0; j < itemlen; j++) {
        const current = item[j];
        if (ids.includes(current.id)) {
          currents.push(current);
          break;
        }
      }
    }
  });
  return currents;
}

async function getDetails(list) {
  const magnetList = [];
  for (let item of list) {
    const realUrl = base + item.href;
    const resp = await axios.get(realUrl, {
      responseType: 'arraybuffer'
    });
    const respData = iconv.decode(resp.data, 'gbk');
    const $ = cheerio.load(respData);
    const a = $('#Zoom span a');
    const aHref = a.attr('href');
    magnetList.push((aHref.replace(/&dn=(%(\d|\w)+)+www.ygdy8.com./, '&dn=')));
  }
  return magnetList;
}

function createDownload(list) {
  list.forEach(async (li) => {
    const opt = {
      id: generateUniqueId(),
      jsonrpc: '2.0',
      method: 'aria2.addUri',
      'params': [
        'token:hzhyang',
        [li]
        , {}]
    };
    await axios.post('http://aria2c.ifelefi.com/jsonrpc', opt);
    // console.log(resp.data);
  });
  return '添加成功';
}


function generateUniqueId() {
  const sourceId = 'AriaNg' + '_' + Math.round(new Date().getTime() / 1000) + '_' + Math.random();
  const hashedId = enCodeBase64(sourceId);
  return hashedId;
}

function enCodeBase64(value) {
  return base64.encode(value);
}

