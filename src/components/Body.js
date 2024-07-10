//import restList from "../utils/mockData";
import RestaurantCard from "./RestaurantCards";
import{ useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
 

  // local variable state
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant]= useState([]);

  const [searchText, setSearchText] = useState("");
  console.log(listOfRestaurant);

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
  //check online status
  const onlineStatus = useOnlineStatus();
  if(onlineStatus === false) {
    return (
      <h1>Looks like you are offline. Please check your internet connection!</h1>
    )
  }
// conditional rendering
    return listOfRestaurant.length === 0 ? (
    <Shimmer/> )
    :(
      <div className="body">
        <div className="flex  "> 
        <div className="">
          <input type="text" className=" m-2 border border-solid border-black" value={searchText} onChange={
            (e) => {
              setSearchText(e.target.value);
            }
          }/> 
          <button className="m-4" 
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
        <div className="flex flex-wrap m-2 p-2">
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
  