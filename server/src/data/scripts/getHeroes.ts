const puppeteer = require("puppeteer");
import { writeFile } from "fs";
import { resolve } from "path";
import Hero from "../../models/hero";

async function getHeroes() {
  const START_URL: string = "https://www.marvel.com/characters";
  const HOST_URL: string = "https://www.marvel.com";
  let heroes: Hero[] = [];

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );

  console.log("Getting heroes from website", START_URL);
  await page.goto(START_URL, { waitUntil: "networkidle0" });

  /* Running inside Chrome console */
  let heroData = await page.evaluate(() => {
    /* Scrape 12 heroes from the characters page */
    const numOfHeroesToScrape: number = 12;

    /* Using vanilla JS in the console to scrape for elements of interest */
    let heroNames: string[] = [];
    let heroNodeList = document.querySelectorAll(
      'p[class="card-body__headline"]'
    );

    let heroLinks: string[] = [];
    let linkNodeList = document.querySelectorAll('[href*="/characters/"]');

    let heroPhotos: string[] = [];
    let photoNodeList = document.querySelectorAll('img[mvl-type="explore"]');

    /* Get the elements of interest from the Nodelist and create a new unique set 
       and slice by number of heroes to scrape */
    photoNodeList.forEach(photo => heroPhotos.push(photo.getAttribute("src")));
    heroPhotos = [...new Set(heroPhotos.map(photo => photo))].slice(
      0,
      numOfHeroesToScrape
    );

    linkNodeList.forEach(link => heroLinks.push(link.getAttribute("href")));
    heroLinks = [...new Set(heroLinks.map(link => link))].slice(
      0,
      numOfHeroesToScrape
    );

    heroNodeList.forEach(name => heroNames.push(name.textContent.trim()));
    heroNames = [...new Set(heroNames.map(name => name))].slice(
      0,
      numOfHeroesToScrape
    );

    return [heroNames, heroLinks, heroPhotos];
  });

  /* Collect Bio from each individual hero page - Runs sequentially, not in parallel to avoid overconsumption of memory */
  let biosData: string[] = [];
  for (let i = 0; i < heroData[0].length; i++) {
    await page.goto(`${HOST_URL}${heroData[1][i]}`, {
      waitUntil: "networkidle0"
    });

    let currentBios = await page.evaluate(() => {
      let bio = document.querySelector('div[class="masthead__copy"]')
        .textContent;
      return bio;
    });
    biosData.push(currentBios);
  }
  
  /* Push Bio data onto hero array and remove the links used to scrape bios */
  heroData.push(biosData);
  heroData.splice(1, 1);

  /* Zip heros arrays together */
  const zipped = heroData[0].map((_, i) => heroData.map(arr => arr[i]));
  
  /* Map the arrays to a new object with labeled keys  */
  const res = zipped.map(([name, photo, bio], id) => ({
    id,
    name,
    photo,
    bio
  }));

  /* Assign the final object to the heroes type */
  heroes = [...res];

  await browser.close();

  writeFile(
    resolve(__dirname, "../heroes.json"),
    JSON.stringify(heroes, null, 2),
    err => {
      if (err) {
        throw err;
      }
      console.log("Finished writing file");
    }
  );
}

getHeroes();
