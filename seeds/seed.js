const sequelize = require("../config/connection");

const { User, CoinList, Crypto } = require("../models");
const userData = require("./userData.json");

const coinListData = require("./coinListData.json");
const cryptoData = require("./cryptoData.json");

const userSeeds = require("./userSeeds");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await CoinList.bulkCreate(coinListData, {
    individualHooks: true,
    returning: true,
  });

  await Crypto.bulkCreate(cryptoData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
