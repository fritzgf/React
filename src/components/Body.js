//import restList from "../utils/mockData";
import RestaurantCard from "./RestaurantCards";
import{ useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";

const Body = () => {
 

  // local variable state
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant]= useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(()=> {
    fetchData();
  }, []);

  const fetchData = async ()=> {
    // use https://corsproxy.io/? to bypass the CORS
    const data = await fetch( 
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
     
    );
    const json = await data.json();
    console.log(json);
    setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

  };
// conditinal rendering
    return listOfRestaurant.length === 0 ? (
    <Shimmer/> )
    :(
      <div className="body">
        <div className="filter"> 
        <div className="search">
          <input type="text" className="search-box" value={searchText} onChange={
            (e) => {
              setSearchText(e.target.value);
            }
          }/> 
          <button className="search-btn" 
          onClick={ () => 
            {
             const filteredRestaurant = listOfRestaurant.filter( 
              (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())   
            );
            setFilteredRestaurant(filteredRestaurant);
            console.log(filteredRestaurant);
            }
          }> Search</button>
        </div>
        <button className= "filter-bnt"
        onClick={ () =>
          {
            const filteredList = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4.2
            );
            setFilteredRestaurant(filteredList);
            console.log(filteredList);
          }
        } 
        >
          Top Rated Restaurant

        </button>
        </div>
        <div className="res-container">
          {
            filteredRestaurant.map((restaurant) => (
              <Link key= {restaurant.info.id}
               to={"/restaurant/" + restaurant.info.id} > 
              <RestaurantCard resData={restaurant}/>
              </Link>
              
  
            ))}
    
        </div>
      </div>    
    )
  };
  
  export default Body;
  