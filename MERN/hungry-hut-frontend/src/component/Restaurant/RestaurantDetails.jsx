import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuCard from "./MenuCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../state/Restaurant/Action";
import { getMenuItemsByRestaurantIdUser } from "../../state/Menu/Action";

const foodTypes = [
  { value: "all", label: "All" },
  { value: "veg", label: "Veg" },
  { value: "non-veg", label: "Non-Veg" },
  { value: "seasonal", label: "Seasonal" },
];

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);
  const { id } = useParams();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getRestaurantById({ jwt: jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
  }, [dispatch, id, jwt]);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantIdUser({
        jwt,
        restaurantId: id,
        vegetarian: selectedType==="veg",
        nonveg: selectedType==="non-veg",
        seasonal: selectedType==="seasonal",
        foodCategory: selectedCategory,
      })
    );
  },[selectedCategory,selectedType,jwt,id,dispatch]);


  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

    const handleFilterType = (e) => {
      setSelectedType(e.target.value);
  };



  return (
    <div className="px-5 lg:px-20 pb-10 pt-4">
      <section>

        <div>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12}>
              <img
                src={restaurant.restaurant?.images[0]}
                alt=""
                className="w-full h-[40vh] object-cover"
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[1]}
                alt=""
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[2]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>

        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {restaurant.restaurant?.name}
          </h1>

          <p className="text-gray-500 mt-1">
            <span>{restaurant.restaurant?.description}</span>
          </p>

          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span> 123, Baker Street, London, UK</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarMonthIcon />
              <span>
                {restaurant.restaurant?.openingHours},
                {restaurant.restaurant?.open ? (
                  <span className="text-green-600">Open</span>
                ) : (
                  <span className="text-red-600">Closed</span>
                )}
              </span>
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section className="pt-[2rem] lg:flex relative">
        <div className=" space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterType}
                  name="food_type"
                  value={selectedType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterCategory}
                  name="food_category"
                  value={selectedCategory}
                >
                  {restaurant.categories?.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className=" space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems?.map((item) => (
            <MenuCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
