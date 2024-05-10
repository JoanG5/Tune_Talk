const { Sequelize } = require("sequelize");

const albumModel = (sequelize) => {
  const Album = sequelize.define("Album", {
    album_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    artist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    release_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    spotify_id : {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },
  });

  return Album;
};

module.exports = { albumModel };
