import Hero from "../models/hero";

const heroJSONFile: string = "../data/heroes.json";
const heroesData = require(heroJSONFile);

function checkIfHeroExists(herosObjectArray, id: string): Promise<Hero> {
  return new Promise((resolve, reject) => {
    // Check to see if the ID exists within the array of objects (the heroes)
    const hero = herosObjectArray.find(element => element.id == id);
    // If no hero is found with the requested ID, throw an invalid request error
    if (!hero) {
      reject({
        message: `Unknown hero with id of ${id}`,
        status: 400
      });
    }
    // Otherwise we are good to go!
    resolve(hero);
  });
}

function getHero(id:string): Promise<Hero> {
  return new Promise((resolve, reject) => {
    checkIfHeroExists(heroesData, id)
      .then(hero => resolve(hero))
      .catch(error => reject(error));
  });
}

export default {
  getHero
};
