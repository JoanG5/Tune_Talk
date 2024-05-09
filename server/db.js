const { Sequelize } = require("sequelize");
const { reviewModel } = require("./routes/Reviews/review.model");
require("dotenv").config();

const connection = async () => {
  const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
  let Review = null;
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    Review = reviewModel(sequelize);
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connection };