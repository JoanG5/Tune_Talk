const { Sequelize } = require("sequelize");

const songModel = (sequelize) => {
  const Song = sequelize.define("Song", {
    song_id: {
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
    album: {
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
    spotify_id: {
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

  return Song;
};

module.exports = { songModel };
