import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]); // Default to an empty array
    const [foodItem, setFoodItem] = useState([]); // Default to an empty array

    const loadData = async () => {
        let response = await fetch("http://localhost:8080/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        console.log('API Response:', response);  // Log the API response to inspect it

        setFoodItem(response[0] || []);  // Safely set the data, fallback to empty array if null
        setFoodCat(response[1] || []);   // Safely set the data, fallback to empty array if null
    }

    useEffect(() => {
        loadData();
    }, []);

    // Log the state variables to check their values before rendering
    console.log('foodCat:', foodCat);
    console.log('foodItem:', foodItem);

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>

                        <div className="carousel-item active">
                            <img src="images/burger2.jpg" className="d-block w-100" style={{ filter: "brightness(100%)", objectFit: "cover", height: "500px", width: "auto" }} alt="Burger" />
                        </div>
                        <div className="carousel-item">
                            <img src="images/momos4.jpg" className="d-block w-100" style={{ filter: "brightness(100%)", objectFit: "cover", height: "500px", width: "auto" }} alt="Momos" />
                        </div>
                        <div className="carousel-item">
                            <img src="images/pizza2.jpg" className="d-block w-100" style={{ filter: "brightness(100%)", objectFit: "cover", height: "500px", width: "auto" }} alt="Pizza" />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    // Safeguard against null or undefined foodCat
                    foodCat && foodCat.length > 0
                        ? foodCat.map((data) => (
                            <div className='row mb-3' key={data._id}>
                                <div className="fs-3 m-3">
                                    {data.CategoryName}
                                </div>
                                <hr />
                                {
                                    foodItem.length > 0
                                        ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filterItems => (
                                                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mx-3">
                                                    <Card foodItem = {filterItems}
                                                        foodName={filterItems.name}
                                                        options={filterItems.options ? filterItems.options[0] : {}}  // Safely access options
                                                        imgSrc={filterItems.img}
                                                    />
                                                </div>
                                            ))
                                        : <div>No such data found</div>
                                }
                            </div>
                        ))
                        : <div>No Categories Found</div>  // Fallback if no categories
                }
            </div>

            <div><Footer /></div>
        </div>
    )
}
