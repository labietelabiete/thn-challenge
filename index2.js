const puppeteer = require("puppeteer");

(async () => {
  // Using headless we open the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  /************************************** */

  /*CENTARA GRAND*/

  await page.goto(
    "https://www.book-secure.com/index.php?s=results&group=ascentral&property=thphu18547&arrival=2021-12-14&departure=2021-12-17&adults1=2&children1=1&childrenAges1=1&locale=en_GB&currency=THB&stid=6ynyzt279&Clusternames=ascentral&cluster=ascentral&Hotelnames=Asia-Centara-Grand-Beach-Resort-Phuket&hname=Asia-Centara-Grand-Beach-Resort-Phuket&arrivalDateValue=2021-12-14&frommonth=12&fromday=14&fromyear=2021&nbdays=3&nbNightsValue=3&adulteresa=2&nbAdultsValue=2&enfantresa=1&nbChildrenValue=1&redir=BIZ-so5523q0o4&rt=1637313048"
  );

  await page.waitForSelector("#fb-main-container");

  console.log("Container loaded");

  const prices = await page.evaluate(() => {
    const elements = document.querySelectorAll(".rate-title");
    console.log(elements);

    const priceInfo = [];

    for (let element of elements) {
      priceInfo.push(element.innerHTML);
    }

    return priceInfo;
  });

  console.log(prices);

  /************************************** */

  /*HOTEL CONDADO*/

  // await page.goto(
  //   "https://reservations.condadohotel.com/condadohotel.com/es/availability?adults=2&datein=18-11-2021&dateout=23-11-2021"
  // );

  // await page.waitForSelector("#centerContainer");

  // console.log("Container loaded");

  // const prices = await page.evaluate(() => {
  //   const elements = document.querySelectorAll(".integerPart");
  //   console.log(elements);

  //   const priceInfo = [];

  //   for (let element of elements) {
  //     priceInfo.push(element.innerHTML);
  //   }

  //   return priceInfo;
  // });

  // console.log(prices);

  /************************************** */

  /*LE PETIT ERMITAGE*/

  // await page.goto(
  //   "https://reservations.travelclick.com/110426?datein=11%2F23%2F2021&dateout=11%2F25%2F2021&adults=2&identifier=&_ga=2.200653927.859581762.1637252285-1760219410.1637252285#/accommodation/room"
  // );

  // await page.waitForSelector("#AccommodationsListId");

  // console.log("Container loaded");

  // const prices = await page.evaluate(() => {
  //   const elements = document.querySelectorAll(".CardList-price-title");
  //   console.log(elements);

  //   const priceInfo = [];

  //   for (let element of elements) {
  //     priceInfo.push(element.innerHTML);
  //   }

  //   return priceInfo;
  // });

  // console.log(prices);

  /************************************************************************* 
  // Examining elements web and getting url for each articles title
  const enlaces = await page.evaluate(() => {
    const elements = document.querySelectorAll(".has-post-thumbnail .card a");

    const links = [];

    for (let element of elements) {
      links.push(element.href);
    }

    return links;
  });

  const books = [];

  for (let enlace of enlaces) {
    console.log(enlace);
    await page.goto(enlace);
    await page.waitForSelector("#main");

    // const book = await page.evaluate(() => {
    //   const tmp = {};
    //   tmp.title = document.querySelector("#title").innerText;
    //   tmp.author = document.querySelector("#author").innerText;
    //   return tmpc;
    // });
    // books.push(book);
  }

  console.log(enlaces);
  */

  // await browser.close();
})();
