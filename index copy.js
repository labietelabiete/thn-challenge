const puppeteer = require("puppeteer");

(async () => {
  // Using headless we open the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://blackiebooks.org/");
  // await page.goto(
  //   "https://www.book-secure.com/index.php?s=results&group=ascentral&property=thphu18547&arrival=2022-02-15&departure=2022-02-18&adults1=2&children1=1&childrenAges1=5&locale=es_ES&currency=EUR&stid=vegocg7w2&Clusternames=ascentral&cluster=ascentral&Hotelnames=Asia-Centara-Grand-Beach-Resort-Phuket&hname=Asia-Centara-Grand-Beach-Resort-Phuket&arrivalDateValue=2022-02-15&frommonth=2&fromday=15&fromyear=2022&nbdays=3&nbNightsValue=3&adulteresa=2&nbAdultsValue=2&enfantresa=1&nbChildrenValue=1&redir=BIZ-so5523q0o4&rt=1637254567"
  // );

  // await page.type("#twotabsearchtextbox", "libros de javascript");
  // // await page.type(".fb-price-currency", "First room");

  // // Clicking search button
  // await page.click(".nav-search-submit-text input");

  // // Waiting for the event
  // await page.waitForSelector(".s-image");
  // await page.waitFor(3000);

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

  await browser.close();
})();
