const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Make sure this path is correct

router.post('/orderData', async (req, res) => {
    const { order_data, email } = req.body;

    // Ensure order_data is an array
    if (!Array.isArray(order_data) || !email) {
        return res.status(400).json({ success: false, message: "Invalid request data" });
    }

    // Create order object
    const order = {
        email: email,
        order_data: order_data.map(item => ({
            Order_date: new Date().toISOString(), // Set current date
            items: item.items || [] // Ensure items exist
        }))
    };

    try {
        // Check if the email already exists in the database
        let existingOrder = await Order.findOne({ email: email });

        if (!existingOrder) {
            // If the email does not exist, create a new order
            await Order.create(order);
            return res.json({ success: true, message: "Order created successfully!" });
        } else {
            // If the email exists, update the order by pushing new order data
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: order.order_data } }
            );
            return res.json({ success: true, message: "Order updated successfully!" });
        }
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
});

module.exports = router;
