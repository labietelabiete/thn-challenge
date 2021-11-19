const puppeteer = require("puppeteer");

(async () => {
  // Using headless we open the browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  /*LE PETIT ERMITAGE*/
  try {
    await page.goto(
      "https://reservations.travelclick.com/110426?datein=01%2F23%2F2022&dateout=01%2F30%2F2022&identifier=&_ga=2.265002822.859581762.1637252285-1760219410.1637252285#/accommodation/room"
    );

    await page.waitForSelector("#AccommodationsListId");

    console.log("Container loaded");

    const prices = await page.evaluate(() => {
      const rooms = [];
      const titles = document.querySelectorAll(".CardList-summary-title");
      const prices = document.querySelectorAll(".CardList-price-title");

      for (let i = 0; i < titles.length; i++) {
        let room = {};
        room.title = titles[i].innerHTML;
        room.price = prices[i].innerHTML;
        rooms.push(room);
      }

      return rooms;

      // const priceInfo = [];

      // for (let room of rooms) {
      //   room.push(element.innerHTML);
      // }

      // return room;
    });

    console.log(prices);
    console.log(prices.length);
  } catch (error) {
    console.log("The page couldn't be loaded", error);
  }

  /************************
   * checking date yyyy-mm-dd
   * checkout date yyyy-mm-dd
   * minimum price (per night)
   * currency of price (3 ISO char)
   * number of rooms searched
   * number of guests (adults and children)
   * total number of guests
   * language
   * Data from minimum price (refundable, breakfast)
   * Rates object with details
   * Global: .CardList
   *    title: .CardList-summary-title
   *    .CardList-summary-offering-icon-label
   *    price: .CardList-price-title
   ************************/

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
