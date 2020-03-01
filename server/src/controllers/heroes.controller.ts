import * as Express from "express";
import heroHelper from "../helpers/heroHelper";
import path from "path";

// Return all heroes
const findAll = async (req: Express.Request, res: Express.Response) => {
  // We can simply send the json file written to by the web crawler
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  res.sendFile(path.join(__dirname, "../data", "heroes.json"), err => {
    // Return appropriate status code if error encountered (e.g. file or path doesn't exist)
    if (err) {
      //res.status(err.status).end();
    }
  });
};

// Return 1 hero (based on id) from data crawled from website
const findById = async (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  })
  await heroHelper
    .getHero(id)
    .then(hero => res.json(hero))
    .catch(error => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
};

export default {
  findAll,
  findById
};
