const { DataTypes } = require('sequelize');
const DB = require('./index');

const Track = DB.sequelize.define('Track', {
  isrc: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spotifyImageURI: {
    type: DataTypes.STRING,
  },
});

const Artist = DB.sequelize.define('Artist', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Track.hasMany(Artist);
Artist.belongsTo(Track);

module.exports = { Track, Artist };
