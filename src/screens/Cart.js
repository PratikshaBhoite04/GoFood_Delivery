import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import trash from './trash.svg';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        try {
            console.log("Click");
            let userEmail = localStorage.getItem("userEmail");
            if (!userEmail) {
                console.error("User email not found in localStorage");
                return;
            }

            let response = await fetch("http://localhost:8080/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString(),
                }),
            });

            console.log("Order Response:", response);
            if (response.ok) {
                const result = await response.json(); // Get JSON response
                console.log(result.message); // Log the success message
                dispatch({ type: "DROP" });
            } else {
                const errorResponse = await response.json(); // To get the error message if any
                console.error("Error Response:", errorResponse);
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    let totalPrice = data.reduce((total, { price }) => total + price, 0);
    
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ name, qty, size, price }, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{name}</td>
                                <td>{qty}</td>
                                <td>{size}</td>
                                <td>{price}</td>
                                <td>
                                    <button type='button' className='btn p-0'>
                                        <img 
                                            src={trash} 
                                            className='trash-icon'
                                            alt='delete' 
                                            onClick={() => { dispatch({ type: "REMOVE", index: index }) }} 
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5' style={{width: "100px", marginLeft:"500px"}} onClick={handleCheckOut}> Check Out </button>
                </div>
            </div>
        </div>
    );
}
