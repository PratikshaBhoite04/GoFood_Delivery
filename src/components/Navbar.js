import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import '../index.css';


export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  let data = useCart();
    const navigate = useNavigate();

    // Handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");  // Redirect to login after logout
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>

                            {/* Show 'My Orders' if the user is logged in */}
                            {localStorage.getItem("authToken") &&
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                            }
                        </ul>

                        <div className='d-flex'>
                            {/* Show Login and SignUp if not logged in */}
                            {!localStorage.getItem("authToken") ? (
                                <>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                                </>
                            ) : (
                                <div className='d-flex'>
                                    <div className='btn small-button bg-white text-success mx-2 d-flex align-items-center' style={{ padding: '3px 4px', fontSize: '0.875rem' }} onClick={()=>{setCartView(true)}}>
                                        MyCart {" "}
                                        <Badge pill bg="danger" className='ms-1'> {data.length} </Badge>
                                    </div>
                                    {cartView? <Model onClose={()=>setCartView(false)} ><Cart /></Model>:null}

                                    <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                        LogOut
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
