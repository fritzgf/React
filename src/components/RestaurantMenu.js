import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";


const RestaurantMenu = () => {
    
    const [restInfo, setRestInfo] = useState(null);
    const {resId} = useParams();
   //const {params} = useParams();
  // console.log(params)
    
    useEffect(()=> {
        fetchMenu();
    },[])
    
    const fetchMenu = async () => {
        const data = await fetch(
             MENU_API  + resId
        );
        const json = await data.json();
        console.log(json);
       setRestInfo(json.data);
    };
    if(restInfo == null){
        return (
            <Shimmer/>
        );
    }
   const restName = restInfo?.cards[0]?.card?.card?.text;
    console.log(restName);
    //<h1>{restInfo?.cards[0]?.card?.card?.text}</h1>
    const {itemCards} = restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
    console.log(itemCards);
   
    return (
        <div className="menu">

            <h1>{restName}</h1>
            <h2>Menu</h2>
            <ul>
                {itemCards.map((item) => (
                     <li key = {item.card.info.id}>
                     {item.card.info.name}  - {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
                 </li>

                ))}
               
            </ul>
         </div>
        
    );
};
export default RestaurantMenu;