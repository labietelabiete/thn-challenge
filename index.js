const puppeteer = require("puppeteer");

// 30-12/3-1
const url =
  "https://reservations.travelclick.com/110426?datein=12%2F30%2F2021&dateout=01%2F03%2F2022&identifier=&_ga=2.233116887.859581762.1637252285-1760219410.1637252285#/accommodation/room";

// const url =
//   "https://reservations.travelclick.com/110426?datein=01%2F23%2F2022&dateout=01%2F30%2F2022&identifier=&_ga=2.265002822.859581762.1637252285-1760219410.1637252285#/accommodation/room";

// Two months with 1 cifre each one 05-01/02-02
// const url =
//   "https://reservations.travelclick.com/110426?datein=01%2F05%2F2022&dateout=02%2F02%2F2022&identifier=&_ga=2.166977399.859581762.1637252285-1760219410.1637252285#/accommodation/room";

function getMonthNumber(month) {
  switch (month) {
    case "Jan":
      return "1";
    case "Feb":
      return "2";
    case "Mar":
      return "3";
    case "Apr":
      return "4";
    case "May":
      return "5";
    case "Jun":
      return "6";
    case "Jul":
      return "7";
    case "Aug":
      return "8";
    case "Sep":
      return "9";
    case "Oct":
      return "10";
    case "Nov":
      return "11";
    case "Dec":
      return "12";
    default:
      console.log("Error on month");
  }
}

// Auxiliar function to transform web date format to yyyy-mm-dd format
function getDates(dates) {
  const sepPos = dates.indexOf("-");
  let inYear = "2021";
  let inMonth = getMonthNumber(dates.substring(0, 3));
  let inDay = dates.substring(sepPos - 2, sepPos);
  let outYear = "2021";
  let outMonth;
  let outDay;

  if (dates.length > 10) {
    // Long date format from website
    outMonth = getMonthNumber(dates.substring(sepPos + 1, sepPos + 4));
    outDay = dates.substring(sepPos + 6, dates.length - 1);

    if (parseInt(outMonth) > parseInt(inMonth)) outYear = "2022";
  } else {
    // Short date format from website
    outMonth = inMonth;
    outDay = dates.substring(sepPos + 1, dates.length - 1);
  }

  if (parseInt(inMonth) < 10) inMonth = "0" + inMonth;
  if (parseInt(inDay) < 10) inDay = "0" + inDay;
  if (parseInt(outMonth) < 10) outMonth = "0" + outMonth;
  if (parseInt(outDay) < 10) outDay = "0" + outDay;

  const result = {
    inDate: inYear + ":" + inMonth + ":" + inDay,
    outDate: outYear + ":" + outMonth + ":" + outDay,
  };

  return result;
}

async function getHotelInfo(url) {
  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  try {
    await page.goto(url);

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

      // const guests = document.querySelectorAll(".HeaderButton-value div")[1]
      //   .innerHTML;
      const guests = document.querySelector(
        `.HeaderButton-value [ng-show*="guestsRooms && MRB"]`
      ).innerHTML;

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
      const dates = document.querySelector(
        `.HeaderButton-value [ng-show*="datesOfStay"]`
      ).innerHTML;

      // const nPosition = dates.indexOf("-");

      // let inMonth = dates.substring(0, 3);
      // let inDay = dates.substring(nPosition - 2, nPosition);
      // let outMonth = dates.substring(nPosition + 1, nPosition + 4);
      // let outDay = dates.substring(nPosition + 6, dates.length - 1);

      return [rooms, dates];
    });
    console.log(allRooms);
    const date = getDates(allRooms[1]);
    console.log(date);
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
}

const infoHotel = getHotelInfo(url);
console.log(infoHotel);
