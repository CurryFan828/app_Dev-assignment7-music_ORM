// Creating a database connection using Sequelize ORM
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create the new instance of Sequelize
const db = new Sequelize({ 
    dialect: 'sqlite', 
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db', 
    logging: console.log // Not necessary, but shows SQL queries in the console 
})


async function setupDatabase() {
    try {
        // 1. Check that we can connect
        await db.authenticate();
        console.log("Connection to the database was successful.");

        // 2. Create tables (force: true recreates the tables fresh)
        await db.sync({ force: true });
        console.log("Database tables created successfully.");

        // 3. Close the connection
        await db.close();
        console.log("Database connection closed.");
    } 
    catch (error) {
        console.error("Error setting up database:", error);
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

// Define Sequelize models here (songTitle, artistName, albumName, genre, duration, releaseYear)
const Track = db.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
    }, 
    releaseYear: {
        type: DataTypes.INTEGER
    }
});

// Export the model and the connection to use in other files 
module.exports = { db, Track };