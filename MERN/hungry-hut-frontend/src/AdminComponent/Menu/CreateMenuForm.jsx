import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from "../util/UploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../state/Menu/Action";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const categories = useSelector((store) => store.restaurant.categories);
  const restaurant = useSelector((store) => store.restaurant.usersRestaurant);
  const navigate=useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = restaurant._id;
      dispatch(createMenuItem({menu:values,jwt:localStorage.getItem("jwt")}));
      navigate("/admin/restaurant/menu");
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex  justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">Add New Menu</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid item xs={12} className="flex flex-wrap gap-5">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="fileInput" className="relative">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border roundes-md border-gray-600">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}
              ></TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.name} value={category}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-checkbox-label">
                  Ingredients
                </InputLabel>
                <Select
                  labelId="ingredients"
                  id="ingredients"
                  name="ingredients"
                  multiple
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={<OutlinedInput label="ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{display:"flex",flexWrap:"wrap",gap:0.5}}>
                      {selected.map((value)=>(<Chip key={value._id} label={value.name}/>))}
                    </Box>
                  )}
                >
                  {ingredients?.map((ingredient) => (
                    <MenuItem key={ingredient.name} value={ingredient}>
                      <Checkbox
                        checked={formik.values.ingredients.includes(
                          ingredient
                        )}
                      />
                      <ListItemText primary={ingredient.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel>Is Vegetarian</InputLabel>
                <Select
                  id="vegetarian"
                  name="vegetarian"
                  label="Is Vegetarian"
                  value={formik.values.vegetarian}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel>Is Seasonal</InputLabel>
                <Select
                  id="seasonal"
                  name="seasonal"
                  label="Is Seasonal"
                  value={formik.values.seasonal}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" color="primary">
            Create Menu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
