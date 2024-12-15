import React, { useEffect, useState, useRef } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();

    const options = props.options;
    const priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0] || ""); // Set initial size to the first available option

    // Recalculate `finalPrice` on every render based on qty and size
    const finalPrice = qty * parseInt(options[size] || 0);  // Fallback to 0 if size is not selected

    // Handle adding the item to cart
    const handleAddToCart = async () => {
        let food = data.find(item => item.id === props.foodItem._id);

        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
            } else {
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
            }
        } else {
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
    };

    useEffect(() => {
        setSize(priceRef.current.value); // Initialize size to the default selected option
    }, []);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" style={{ height: "120px", objectFit: "fill" }} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">of the card's content.</p>
                    <div className='container w-100'>
                        {/* Quantity Dropdown */}
                        <select
                            className='m-2 h-100 bg-success rounded'
                            onChange={(e) => setQty(Number(e.target.value))}  // Convert value to number
                        >
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                );
                            })}
                        </select>

                        {/* Size Dropdown */}
                        <select
                            className='m-2 h-100 bg-success rounded'
                            ref={priceRef}
                            onChange={(e) => setSize(e.target.value)}  // Update size when changed
                        >
                            {priceOptions.map((data) => (
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>

                        {/* Display Final Price */}
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <div style={{display: "flex",justifyContent: "center" ,alignItems: "center"}}>

                    
                    <button className='btn btn-success justify-center ms-2 ' style={{width: "200px",}} onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
