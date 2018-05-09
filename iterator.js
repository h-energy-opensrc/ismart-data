//https://intoli.com/blog/scrape-infinite-scroll/
// How to run 
// npm install 
// node iterator.js {acc} {id}

const puppeteer = require('puppeteer');
const fs = require('fs');

// var m = moment(process.argv[2]);
// var refId = process.argv[3]
// var acc = process.argv[4]
// var pw = process.argv[5]

function extractItems() {

}

async function loadDateView(page, year, month, day){
  const links = await page.evaluate(({
    year,
    month,
    day
  }) => {
    document.querySelector(`select[name=year] [value^="${year}"]`).selected = true;
    document.querySelector(`select[name=month] [value^="${month}"]`).selected = true;
    document.querySelector(`select[name=day] [value^="${day}"]`).selected = true;
    return {
      year: year,
      month: month,
      day: day
    }
  }, {
    year,
    month,
    day
  })

  console.log(links)
  await page.click('.btn_search')
  await page.waitFor(2000);
}

async function login(page, {acc, pw}) {
  const resultsSelector = 'input#id';
  await page.waitForSelector(resultsSelector);
  await page.type(resultsSelector, acc)
  await page.type('input#password', pw)
  await page.click('.login_btn')
  await page.waitFor(2000);
  console.log('login')
}

async function loadDateData(page) {
  const items = []
  try{
    var moment = require("moment")
    var a = moment('2016-01-01');
    var b = moment('2018-05-07');
    for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
      var year = m.format('YYYY')
      var month = m.format('MM')
      var day = m.format('DD')
      await loadDateView(page, year, month, day)
      const table = await page.evaluate(() => {
        const tds1Col1 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(1)'))
        const tds1Col2 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(2)'))
        const tds1Col3 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(3)'))
        const tds1Col4 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(4)'))
        const tds1Col5 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(5)'))
        const tds1Col6 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(6)'))
        const tds1Col7 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(7)'))
        const tds1Col8 = Array.from(document.querySelectorAll('#printArea > div:nth-child(6) table tr td:nth-child(8)'))
    
        const tds2Col1 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(1)'))
        const tds2Col2 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(2)'))
        const tds2Col3 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(3)'))
        const tds2Col4 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(4)'))
        const tds2Col5 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(5)'))
        const tds2Col6 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(6)'))
        const tds2Col7 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(7)'))
        const tds2Col8 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td:nth-child(8)'))
    
        // const tds2 = Array.from(document.querySelectorAll('#printArea > div:nth-child(7) table tr td'))
        var col1 = tds1Col1.map(td => td.innerHTML)
        var col2 = tds1Col2.map(td => td.innerHTML)
        var col3 = tds1Col3.map(td => td.innerHTML)
        var col4 = tds1Col4.map(td => td.innerHTML)
        var col5 = tds1Col5.map(td => td.innerHTML)
        var col6 = tds1Col6.map(td => td.innerHTML)
        var col7 = tds1Col7.map(td => td.innerHTML)
        var col8 = tds1Col8.map(td => td.innerHTML)
    
        col1 = col1.concat(tds2Col1.map(td => td.innerHTML))
        col2 = col2.concat(tds2Col2.map(td => td.innerHTML))
        col3 = col3.concat(tds2Col3.map(td => td.innerHTML))
        col4 = col4.concat(tds2Col4.map(td => td.innerHTML))
        col5 = col5.concat(tds2Col5.map(td => td.innerHTML))
        col6 = col6.concat(tds2Col6.map(td => td.innerHTML))
        col7 = col7.concat(tds2Col7.map(td => td.innerHTML))
        col8 = col8.concat(tds2Col8.map(td => td.innerHTML))
    
        var finalResult = col1.map((val, idx) => {
          return {
            time: val,
            usage: col2[idx],
            maxUsage: col3[idx],
            nonElect1: col4[idx],
            nonElect2: col5[idx],
            co: col6[idx],
            percent1: col7[idx],
            percent2: col8[idx]
          }
        })
        return finalResult
      })
      items.push(table)
    }
    return items
  } catch(e){
    console.log(e)
  }
}

(async () => {
  //set up browser and page 
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://pccs.kepco.co.kr/iSmart/jsp/cm/login/main.jsp')
  const loginStatus = await login(page, {
    acc: '0339061375',
    pw: 'q39061375'
  })
  const items = await loadDateData(page);
  // Save extracted items to a file.
  console.log('iterator')
  const result = JSON.stringify(items)
  fs.writeFileSync('./items.txt', result);
  await browser.close();
})();
