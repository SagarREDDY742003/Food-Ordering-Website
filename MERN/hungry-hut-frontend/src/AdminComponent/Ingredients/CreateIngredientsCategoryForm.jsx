import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../state/Ingredients/Action";

const CreateIngredientsCategoryForm = () => {

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector(store=>store.restaurant.usersRestaurant)

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name:formData.name,
      restaurantId:restaurant._id
    }
    dispatch(createIngredientCategory({data:data,jwt:jwt}));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  return (
    <div className="">
      <div className="p-3">
        <h1 className="text-gray-400 text-center text-xl pb-8">
          Create Ingredient Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            id="name"
            name="name"
            label="Category Name"
            onChange={handleInputChange}
            value={formData.name}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientsCategoryForm;
