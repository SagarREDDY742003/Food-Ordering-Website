import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Orders from "../Orders/Orders";
import Menu from "../Menu/Menu";
import FoodCategory from "../FoodCategory/FoodCategory";
import Ingredients from "../Ingredients/Ingredients";
import Events from "../Events/Events";
import Details from "../Details/Details";
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsCategory } from "../../state/Restaurant/Action";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { getRestaurantsOrder } from "../../state/RestaurantOrder/Action";
import { getIngredientsOfRestaurant } from "../../state/Ingredients/Action";

const Admin = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const usersRestaurant = useSelector(
    (store) => store.restaurant.usersRestaurant
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(
      getRestaurantsCategory({ jwt: jwt, restaurantId: usersRestaurant?._id })
    );
    dispatch(
      getRestaurantsOrder({ jwt: jwt, restaurantId: usersRestaurant?._id })
    );
    dispatch(getIngredientsOfRestaurant({ id: usersRestaurant?._id, jwt: jwt }));
  }, [usersRestaurant, jwt, dispatch]);

  return (
    <div>
      <div className="px-3 sticky top-0 py-2 bg-[#b80742] flex justify-between z-50">
        <div
          className="lg:mr-10 cursor-pointer flex items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <img
            src="https://res.cloudinary.com/debpngulj/image/upload/v1758378624/Aldjwx9IZEnqwEt1zYxhBySZE3_rTGMgKm-9fIUnrX12_eHw6Mg7EevhnP14BLfDjkI_fjerry.png"
            className="h-[3.4rem] w-[3.4rem] object-cover object-center rounded-full "
            alt=""
          />
          <li className="logo font-semibold italic text-gray-100 text-2xl list-none">
            Hungry Hut
          </li>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-10 lg:collapse">
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      <div className="lg:flex justify-between space-y-3">
        <div className="z-20">
          <AdminSideBar open={open} handleClose={handleClose} />
        </div>

        <div className="lg:w-[80%] px-1">
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category" element={<FoodCategory />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/events" element={<Events />} />
            <Route path="/details" element={<Details />} />
            <Route path="/addMenu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
