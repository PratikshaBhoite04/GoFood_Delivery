const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://Foodapp:Gofood@cluster0.2kavf.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetch data from food_items collection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCaregory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        // Log fetched data for debugging
        console.log("Fetched food_items data: ", fetched_data);
        console.log("Fetched foodCaregory data: ", foodCaregory);

        // Set global variables if no error
        global.food_items = fetched_data;
        global.foodCaregory = foodCaregory;

    } catch (error) {
        console.error("Connection or fetching error:", error);
    }
};

module.exports = mongoDB;
