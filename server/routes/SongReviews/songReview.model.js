const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database");

const SongReview = sequelize.define("Review", {
  review_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  spotify_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Songs",
      key: "song_id",
    },
  },
});

module.exports = SongReview;
