const mongodb = require("mongodb");

const MongoClient=mongodb.MongoClient;

const dbUrl ="mongodb+srv://root:Admin123@cluster0.npk3t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports={dbUrl,mongodb,MongoClient};