import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../state/Ingredients/Action";

const CreateIngredientForm = () => {

  const dispatch=useDispatch();

    const ingredientCategories =useSelector(store=>store.ingredients.categories);
    const restaurant = useSelector(store=>store.restaurant.usersRestaurant)
    
  const [FormData, setFormData] = useState({
    name: "",
    categoryId: "",
    restaurantId:""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: FormData.name,
      categoryId:FormData.categoryId,
      restaurantId:restaurant._id
    };
    dispatch(createIngredient({data:data,jwt:localStorage.getItem("jwt")}));
    
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
          Create Ingredient
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            id="name"
            name="name"
            label="Name"
            onChange={handleInputChange}
            value={FormData.name}
            fullWidth
          />
          <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  id="seasonal"
                  name="categoryId"
                  label="Is Seasonal"
                  value={FormData.categoryId}
                  onChange={handleInputChange}
                  
                >
                  {
                    ingredientCategories.map((category)=>
                      <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                    )
                  }
                </Select>
              </FormControl>
          <Button type="submit" variant="contained" fullWidth>
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientForm;
