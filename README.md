# The Hotels Network tech challenge 👨‍💻<!-- omit in toc -->

This project is a technical challenge by [The Hotels Network](https://www.thehotelsnetwork.com/es/) to get relevant data from a search page of the hotel [Petit Ermitage](https://www.petitermitage.com/).

# Table of contents <!-- omit in toc -->

- [🚀 Getting Started](#-getting-started)
  - [System requirements 📋](#system-requirements-)
  - [Installation 🔧](#installation-)
- [Project functionalities](#project-functionalities)

# 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## System requirements 📋

You need to have [NodeJs](https://nodejs.org/) installed to run the backend .
Install Yarn globally: `npm install --global yarn`

## Installation 🔧

First, you will need to `clone` or `fork` the repository into your Github account:

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

`$ git clone https://github.com/labietelabiete/thn-challenge`

Then run npm install in the base folder `npm install` to install dependencies.

# Project functionalities

Relevant data from the reservation search is taken by web scraping using [Puppeteer](https://developers.google.com/web/tools/puppeteer) library. To run the script execute on the base folder:

`$ node index.js`

The script return an object with this information:

```
{
  checkinDate: '2021:12:12',
  checkoutDate: '2021:12:19',
  minPrice: '$ 314.00',
  currency: 'USD',
  nRooms: 10,
  adults: 2,
  children: 0,
  guests: 2,
  language: 'EN',
  roomsDetails: [
    {
      title: 'Demi Queen Kitchenette Suite',
      price: '$ 314.00',
      others: [2 People, 1 Queen Bed, 350  ft2 / 33 m2]
    },
    { title: 'Demi Double', price: '$ 324.00', others: [2 People, 1 King Bed, 1 Sofa Bed, 550  ft2 / 51 m2] },
    { title: 'Junior Suite', price: '$ 354.00', others: [2 People, 2 Double Bed, 350  ft2 / 33 m2] },
    { title: 'Executive Suite', price: '$ 404.00', others: [2 People, 1 Queen Bed, 450  ft2 / 42 m2] },
    {
      title: 'Executive Suite With Kitchenette',
      price: '$ 424.00',
      others: [2 People, 1 Queen Bed, 650  ft2 / 60 m2]
    },
    { title: 'One Bedroom Suite', price: '$ 474.00', others: [2 People, 2 Double Bed, 350  ft2 / 33 m2] },
    {
      title: 'Masters Quarters Demi Suite',
      price: '$ 419.00',
      others: [1 King Bed, 1 Sofa Bed, 550  ft2 / 51 m2]
    },
    {
      title: 'Masters Quarters Junior Suite',
      price: '$ 454.00',
      others: [2 People, 1 Queen Bed, 350  ft2 / 33 m2]
    },
    {
      title: 'Masters Quarters Executive Suite',
      price: '$ 559.00',
      others: [2 People, 1 QueeKingn Bed, 450  ft2 / 42 m2]
    },
    {
      title: 'Masters Quarters One Bedroom',
      price: '$ 664.00',
      others: [2 People, 2 Double Bed, 550  ft2 / 500  m2]
    }
  ]
}
```

This is the default search on the script, if you want to change it, visit [Petit Ermitage](https://www.petitermitage.com/), search for an accomodation, and copy and paste the website url on the script in the _constant called url in line 5_.

`const url = "https://reservations.travelclick.com/110426?datein=12%2F12%2F2021&dateout=12%2F19%2F2021&identifier=&_ga=2.81258903.1842764875.1637513762-1760219410.1637252285#/accommodation/room"; `
