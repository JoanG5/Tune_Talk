const { Sequelize } = require("sequelize");
const { userModel } = require("./routes/Users/user.model");
const { reviewModel } = require("./routes/Reviews/review.model");
const { songModel } = require("./routes/Songs/song.model");
const { albumModel } = require("./routes/Albums/album.model");
require("dotenv").config();

const connection = async () => {
  const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
      logging: false,
    }
  );
  let User = null;
  let Review = null;
  let Song = null;
  let Album = null;
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    User = userModel(sequelize);
    Review = reviewModel(sequelize);
    Song = songModel(sequelize);
    Album = albumModel(sequelize);
    await sequelize.sync({ force: true });
    return { User, Review, Song, Album };
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connection };
