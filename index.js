const puppeteer = require("puppeteer");

(async () => {
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  try {
    await page.goto(
      "https://reservations.travelclick.com/110426?datein=01%2F23%2F2022&dateout=01%2F30%2F2022&identifier=&_ga=2.265002822.859581762.1637252285-1760219410.1637252285#/accommodation/room"
    );

    await page.waitForSelector("#AccommodationsListId");

    console.log("Container loaded");

    const allRooms = await page.evaluate(() => {
      let language = document.querySelectorAll(
        "#international-language-dropdown-id div span"
      )[0].innerHTML;
      // Formatting language into two letters code
      language = language.substring(0, 2).toUpperCase();

      let currency = document.querySelector(
        "#international-language-dropdown-id div"
      ).textContent;
      currency = currency.substring(
        currency.indexOf("(") + 1,
        currency.indexOf(")")
      );

      const guests = document.querySelectorAll(".HeaderButton-value div")[1]
        .innerHTML;
      const adults = parseInt(guests.substring(0, 1));
      const children = parseInt(guests.substring(2, 3));
      const nGuests = adults + children;

      // Setting up information for all the rooms avaiables
      const rooms = [];
      const roomTitles = document.querySelectorAll(".CardList-summary-title");
      const roomPrices = document.querySelectorAll(".CardList-price-title");
      const nRooms = roomTitles.length;
      // Others details from all the rooms. It contains an array with each room information
      const allDetails = document.querySelectorAll(
        "ul.CardList-summary-offerings"
      );

      for (let i = 0; i < nRooms; i++) {
        let room = {};
        room.title = roomTitles[i].innerHTML;
        room.price = roomPrices[i * 2].innerHTML;
        room.others = [];

        for (let j = 0; j < allDetails[i].children.length; j++) {
          // For each room "i" we set an array with its corresponding detail "j"

          // It is necessary to format every single data we get from the DOM
          const numberDetail = parseInt(
            allDetails[i].children[j].querySelector("span .IconLabel-label")
              .textContent
          ).toString();
          const nameDetail = allDetails[i].children[j].querySelectorAll(
            "span .IconLabel-label span"
          )[1].textContent;

          const detail = numberDetail + " " + nameDetail;
          room.others.push(detail);
        }

        rooms.push(room);
      }

      // Building an array with the prices in number type to calculate the min price
      const numbRoomPrices = [];

      roomPrices.forEach((room) => {
        let roomPriceValue = Number(
          room.innerHTML.substring(1, room.innerHTML.length)
        );
        numbRoomPrices.push(roomPriceValue);
      });

      const minPrice = Math.min(...numbRoomPrices);

      // Getting date
      const dates = document.querySelector(".confirmation-info").textContent;

      return [rooms, dates];
    });

    console.log(allRooms);
  } catch (error) {
    console.log("The page couldn't be loaded, please check the url");
  }

  await browser.close();

  /************************
   * checking date yyyy-mm-dd
   * checkout date yyyy-mm-dd
   * minimum price (per night) -------------
   * currency of price (3 ISO char) -----------------
   * number of rooms searched ------------
   * number of guests (adults and children) -----------
   * total number of guests ------------
   * language ----------------
   * Data from minimum price (refundable, breakfast)
   * Rates object with details --------------
   ************************/
})();
