const puppeteer = require('puppeteer');
var moment = require("moment")
var m = process.argv
// var m = moment(process.argv[2]);
// var refId = process.argv[3]
// var acc = process.argv[4]
// var pw = process.argv[5]

async function run(data) {
  const puppeteer = require('puppeteer');
  var moment = require("moment")
  console.log(data[2], data[3], data[4], data[5])
  console.log(typeof(data))
  var m = moment(data[2]);
  var refId = data[3]
  var acc = data[4]
  var pw = data[5]
  console.log(refId, acc, pw)

  var admin = require("firebase-admin");
  var _ = require("lodash")

  var serviceAccount = require("./fbkey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://postechproject.firebaseio.com"
  });

  var db = admin.database();
  var ref = db.ref("data/test1");

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    // timeout: 0
    networkIdleTimeout: 5000,
    waitUntil: 'networkidle',
    timeout: 3000000
  });

  const page = await browser.newPage();
  page.on('console', msg => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`)
  })

  await page.goto('https://pccs.kepco.co.kr/iSmart/jsp/cm/login/main.jsp')
  const resultsSelector = 'input#id';
  await page.waitForSelector(resultsSelector);
  await page.type(resultsSelector, acc)
  await page.type('input#password', pw)

  // await page.screenshot({
  //   path: './example2.png'
  // })
  await page.click('.login_btn')
  await page.waitFor(2000);
  // await page.waitForNavigation({waitUntil:'networkidle2'})
  // await page.screenshot({
  //   path: './example3.png'
  // })

  // #txt > div.search_box > div > div.input > span:nth-child(2) > select > option:nth-child(1)
  // await page.select('.select[name=year]', '2015')
  const resultsSelector2 = '#printArea > div:nth-child(7)'
  await page.waitForSelector(resultsSelector2);
  const resultsSelector3 = '#printArea > div:nth-child(6)'
  await page.waitForSelector(resultsSelector3);

  var moment = require("moment")
  var year = m.format('YYYY')
  var month = m.format('MM')
  var day = m.format('DD')

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
  // await page.screenshot({
  //   path: './example4.png'
  // })
  await page.click('.btn_search')
  await page.waitFor(2000);
  // await page.waitForNavigation({waitUntil:'networkidle2'})


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
  ref = db.ref(`data/${refId}/${year}${month}${day}`);
  ref.set(table)
  console.log("done table")
  // await page.screenshot({
  //   path: './example_full.png',
  //   fullPage: true
  // })
  process.exit()
  // await page.waitForSelector(resultsSelector2);  
  // await page.waitForSelector(resultsSelector3);
  // await page.evaluate(() => {
  //   document.querySelector(`select[name=year] [value^="2015"]`).selected = true;
  //   document.querySelector(`select[name=month] [value^="01"]`).selected = true;
  //   document.querySelector(`select[name=day] [value^="02"]`).selected = true;
  // })
  // await page.click('.btn_search')
  // await page.waitForNavigation()

  // await page.screenshot({path: './example_full_2.png', fullPage: true})
  await browser.close();
}

run(m)

/*
(async (m) => {
  console.log(typeof(m))
  var m = moment(m[2]);
  var refId = m[3]
  var acc = m[4]
  var pw = m[5]
  console.log(refId, acc, pw)

  var admin = require("firebase-admin");
  var _ = require("lodash")

  var serviceAccount = require("./fbkey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://postechproject.firebaseio.com"
  });

  var db = admin.database();
  var ref = db.ref("data/test1");

  const browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true,
    // timeout: 0
    networkIdleTimeout: 5000,
    waitUntil: 'networkidle',
    timeout: 3000000
  });

  const page = await browser.newPage();
  page.on('console', msg => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`)
  })

  await page.goto('https://pccs.kepco.co.kr/iSmart/jsp/cm/login/main.jsp')
  const resultsSelector = 'input#id';
  await page.waitForSelector(resultsSelector);
  await page.type(resultsSelector, acc)
  await page.type('input#password', pw)

  // await page.screenshot({
  //   path: './example2.png'
  // })
  await page.click('.login_btn')
  await page.waitFor(2000);
  // await page.waitForNavigation({waitUntil:'networkidle2'})
  // await page.screenshot({
  //   path: './example3.png'
  // })

  // #txt > div.search_box > div > div.input > span:nth-child(2) > select > option:nth-child(1)
  // await page.select('.select[name=year]', '2015')
  const resultsSelector2 = '#printArea > div:nth-child(7)'
  await page.waitForSelector(resultsSelector2);
  const resultsSelector3 = '#printArea > div:nth-child(6)'
  await page.waitForSelector(resultsSelector3);

  var moment = require("moment")
  var year = m.format('YYYY')
  var month = m.format('MM')
  var day = m.format('DD')

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
  // await page.screenshot({
  //   path: './example4.png'
  // })
  await page.click('.btn_search')
  await page.waitFor(2000);
  // await page.waitForNavigation({waitUntil:'networkidle2'})


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
  ref = db.ref(`data/${refId}/${year}${month}${day}`);
  ref.set(table)
  console.log("done table")
  // await page.screenshot({
  //   path: './example_full.png',
  //   fullPage: true
  // })
  process.exit()
  // await page.waitForSelector(resultsSelector2);  
  // await page.waitForSelector(resultsSelector3);
  // await page.evaluate(() => {
  //   document.querySelector(`select[name=year] [value^="2015"]`).selected = true;
  //   document.querySelector(`select[name=month] [value^="01"]`).selected = true;
  //   document.querySelector(`select[name=day] [value^="02"]`).selected = true;
  // })
  // await page.click('.btn_search')
  // await page.waitForNavigation()

  // await page.screenshot({path: './example_full_2.png', fullPage: true})
  await browser.close();
})(m);



/*
(async () => {
  var admin = require("firebase-admin");
  var _ = require("lodash")

  var serviceAccount = require("./fbkey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://postechproject.firebaseio.com"
  });

  var db = admin.database();
  var ref = db.ref("data/test1");

  const browser = await puppeteer.launch({
    // ignoreHTTPSErrors: true,
    timeout: 0
  });

  const page = await browser.newPage();
  page.on('console', msg => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`)
  })

  await page.goto('https://pccs.kepco.co.kr/iSmart/jsp/cm/login/main.jsp')
  const resultsSelector = 'input#id';
  await page.waitForSelector(resultsSelector);
  await page.type(resultsSelector, '0335650156')
  await page.type('input#password', '1234c')

  await page.screenshot({
    path: './example2.png'
  })
  await page.click('.login_btn')
  await page.waitForNavigation()
  await page.screenshot({
    path: './example3.png'
  })

  // #txt > div.search_box > div > div.input > span:nth-child(2) > select > option:nth-child(1)
  // await page.select('.select[name=year]', '2015')
  const resultsSelector2 = '#printArea > div:nth-child(7)'
  await page.waitForSelector(resultsSelector2);
  const resultsSelector3 = '#printArea > div:nth-child(6)'
  await page.waitForSelector(resultsSelector3);




  var moment = require("moment")
  var a = moment('2015-01-02');

  var year = a.format('YYYY')
  var month = a.format('MM')
  var day = a.format('DD')

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
  await page.screenshot({
    path: './example4.png'
  })
  await page.click('.btn_search')
  await page.waitForNavigation()


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

    const col1 = tds1Col1.map(td => td.innerHTML)
    const col2 = tds1Col2.map(td => td.innerHTML)
    const col3 = tds1Col3.map(td => td.innerHTML)
    const col4 = tds1Col4.map(td => td.innerHTML)
    const col5 = tds1Col5.map(td => td.innerHTML)
    const col6 = tds1Col6.map(td => td.innerHTML)
    const col7 = tds1Col7.map(td => td.innerHTML)
    const col8 = tds1Col8.map(td => td.innerHTML)

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

    return {
      data: finalResult,
      // date: year + month + day
    }

  })

  ref = db.ref(`data/test1/${year}${month}${day}`);
  console.log(table)
  ref.set(table)

  await page.screenshot({path: './example_full.png', fullPage: true})

  // await page.waitForSelector(resultsSelector2);  
  // await page.waitForSelector(resultsSelector3);
  // await page.evaluate(() => {
  //   document.querySelector(`select[name=year] [value^="2015"]`).selected = true;
  //   document.querySelector(`select[name=month] [value^="01"]`).selected = true;
  //   document.querySelector(`select[name=day] [value^="02"]`).selected = true;
  // })
  // await page.click('.btn_search')
  // await page.waitForNavigation()

  // await page.screenshot({path: './example_full_2.png', fullPage: true})
  await browser.close();
})();

*/