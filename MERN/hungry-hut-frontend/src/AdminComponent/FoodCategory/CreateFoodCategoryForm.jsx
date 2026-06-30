import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../state/Restaurant/Action";

const initialValues={
    categoryName: "",
    restaurantId: "",
  }
const CreateFoodCategoryForm = () => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialValues);
    const restaurant = useSelector((store) => store.restaurant.usersRestaurant);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurantId:restaurant._id
    };
    dispatch(createCategory({data:data,jwt:localStorage.getItem("jwt")}));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-3">
        <h1 className="text-gray-400 text-center text-xl pb-8">
          Create Category
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            id="categoryName"
            name="categoryName"
            label="Food Category"
            onChange={handleInputChange}
            value={FormData.categoryName}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Create Category
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodCategoryForm;
