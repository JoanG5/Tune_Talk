const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../database");

const CustomSong = sequelize.define("CustomSong", {
  custom_song_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lyrics: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "Users",
      key: "user_id",
    },
  },
});

module.exports = CustomSong;
