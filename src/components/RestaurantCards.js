import { CDN_URL } from "../utils/constants";
const RestaurantCard = (props) => {
    const {resData} =props;
    const {cloudinaryImageId, name, costForTwo,sla,avgRating}=resData?.info;
    return (
      <div className="res-card">
        <img className="res-log"
        src={ CDN_URL + cloudinaryImageId}/>
        <h3>{name}</h3>
        <h4>{costForTwo}</h4>
        <h5>{avgRating} stars</h5>
        <h5>{sla?.slaString}</h5>    
      </div>
    )
  };

  export default RestaurantCard;