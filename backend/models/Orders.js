const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: [
        {
            Order_date: { type: Date, required: true }, // Use Date type
            items: [
                {
                    name: { type: String, required: true },
                    qty: { type: Number, required: true },
                    size: { type: String, required: true },
                    price: { type: Number, required: true },
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Order', OrderSchema);
