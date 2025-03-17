//Sets up the connection to MySQL using Sequelize based on the config.json settings.

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Disable logging SQL queries
  }
);

sequelize.authenticate()  //checks if the database connection is successful
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = sequelize;
