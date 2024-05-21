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
    allowNull: true, //true for now for testing cause rn only have url and nothing else (should we store title and lyrics or just call the suno api and display it from there?)
  },
  url: {
    type: DataTypes.STRING,
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

  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, //only one song per user
    references: {
      model: "Users",
      key: "user_id",
    },
  },
});

module.exports = CustomSong;
