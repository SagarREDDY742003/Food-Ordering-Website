import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToFavourite } from "../../state/Authentication/Action";
import { isPresentInFavorites } from "../../config/Logic";
import { Toast } from "../util/Toast";

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleAddToFavorite = () => {
    dispatch(addToFavourite(jwt, item._id));
    isPresentInFavorites(auth.favorites, item)? Toast("Removd from favorites","remove-fav"):Toast("Added to favorite","add-fav")
  };

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address?.city}/${item.name}/${item._id}`);
    }
  };

  return (
    <Card className="w-[18rem]">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
        onClick={handleNavigateToRestaurant}
      >
        <img
          src={item?.images?.[0]} 
          alt={item?.name || "Restaurant"}
          className="w-full h-[10rem] object-cover rounded-t-md"
        />

        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={item.open ? "success" : "error"}
          label={item.open ? "OPEN" : "CLOSED"}
        />
      </div>

      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-lg">{item.name}</p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <div>
          <IconButton onClick={handleAddToFavorite}>
            {
            isPresentInFavorites(auth.favorites, item) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )
            }
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
