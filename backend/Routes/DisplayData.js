const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // Log both global variables to confirm their values
        console.log('food_items:', global.food_items);
        console.log('foodCaregory:', global.foodCaregory);

        // Ensure data is sent properly, return empty arrays if undefined
        const foodItems = global.food_items || []; // Fallback to empty array
        const foodCategory = global.foodCaregory || []; // Fallback to empty array

        // Log if either is empty for debugging purposes
        if (!foodItems.length) {
            console.log('No food items found');
        }
        if (!foodCategory.length) {
            console.log('No food categories found');
        }

        // Send the response back to the frontend
        res.status(200).send([foodItems, foodCategory]);
    } catch (error) {
        // Catch any error, log and respond with a 500 status
        console.error('Error in /foodData route:', error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
