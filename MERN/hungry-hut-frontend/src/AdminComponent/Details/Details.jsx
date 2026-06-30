import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../state/Restaurant/Action";

const Details = () => {
    const usersRestaurant = useSelector((store) => store.restaurant.usersRestaurant);
    const dispatch = useDispatch();

    console.log(usersRestaurant);

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({restaurantId:usersRestaurant._id , jwt:localStorage.getItem("jwt")}));
  };
  return (
    <div className="lg:px-20 px-5">
      <div className="py-1 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-6xl text-center font-bold p-5">
          {usersRestaurant.name}
        </h1>
        <div>
          <Button
            onClick={handleRestaurantStatus}
            size="large"
            variant="contained"
            className="py-[1rem] px-[2rem]"
            color={usersRestaurant?.open ? "warning" : "success"}
          >
            {usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Restaurant</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-40">Owner</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.owner.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Restaurant Name</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Cuisine Type</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Opening Hours</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Status</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant?.open? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
                        Closed
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Address</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-40">Country</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.address?.country}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">City</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.address?.city}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Postal Code</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.address?.postalCode}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Street Address</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.address?.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Contact</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-40">Email</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Mobile</p>
                  <p>
                    <span className="pr-5">-</span>
                    {usersRestaurant.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-40">Social</p>
                  <div className="flex text-gray-400 items-center pb-3 gap-2">
                    <span className="pr-5">-</span>
                    <a href={usersRestaurant.contactInformation.instagram}><InstagramIcon sx={{fontSize:"3rem"}}/></a>
                    <a href={usersRestaurant.contactInformation.twitter}><XIcon sx={{fontSize:"3rem"}}/></a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
