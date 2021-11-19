const axios = require("axios");
const cheerio = require("cheerio");

axios
  .get("https://www.amazon.es")
  .then((res) => {
    const $ = cheerio.load(res.data);
    // console.log(res.data);
    $(".a-cardui-header").each((index, element) => {
      console.log(element.text());
    });
  })
  .catch((err) => console.error(err));
