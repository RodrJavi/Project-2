const { User } = require("../models");

// username,displayName,password,email
const userData = [
  {
    username: "RedBull",
    displayName: "RedBullOfficial",
    password: "goodDrink",
    email: "redbull@drink.com",
  },
  {
    username: "Toyota",
    displayName: "ToyotaOfficial",
    password: "goodCar",
    email: "toyota@car.com",
  },
  {
    username: "Target",
    displayName: "TargetOfficial",
    password: "goodStore",
    email: "target@store.com",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
