import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]); // Initialize as an empty array

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            console.error('User email not found in localStorage');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // Ensure this matches your response structure
            if (data.orderData && data.orderData.order_data) {
                setOrderData(data.orderData.order_data); // Set order data correctly
            } else {
                console.error("Order data not found in response:", data);
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div>
                <Navbar />
                <div className='container'>
                    <div className='row'>
                        {orderData.length > 0 ? (
                            orderData.reverse().map((orderGroup, index) => {
                                const orderDate = orderGroup[1]; // Accessing the date (assumed as 1)
                                const items = orderGroup[0]; // Accessing the items (assumed as 0)

                                return (
                                    <div key={index}>
                                        <div className='m-auto mt-5'>
                                            <h3>Order Date: {new Date(orderDate).toLocaleDateString()}</h3>
                                            <hr />
                                        </div>
                                        <div className='row'>
                                            {items.map((item, itemIndex) => (
                                                <div className='col-12 col-md-6 col-lg-3' key={itemIndex}>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>Qty: {item.qty}</span>
                                                                <span className='m-1'>Size: {item.size}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{item.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='m-5 w-100 text-center fs-3'>No Orders Found!</div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
