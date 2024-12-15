import React from 'react'

export default function carousel() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
    </div>
    <div className="carousel-item active">
  <img 
    src="images/burger2.jpg" 
    className="d-block w-100" 
    style={{ filter: "brightness(100%)", objectFit: "cover", height: "500px", width: "auto" }} 
    alt="Burger" 
  />
</div>

    <div class="carousel-item">
      <img 
      src="images/momos4.jpg" 
      className="d-block w-100" 
          style={{ filter: "brightness(100%)", objectFit: "cover", height: "500px", width: "auto" }} 
          />
    </div>
    <div class="carousel-item">
      <img src="images/pizza2.jpg" 
      className="d-block w-100" 
      style={{ filter: "brightness(100%)", objectFit: "cover", height: "500px", width: "auto" }} 
      />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  )
}

