import { Divider, Card, Button, Modal, Grid, TextField } from "@mui/material";
import CartItem from "./CartItem";
// import AddressCard from "./AddressCard";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Box from "@mui/material/Box";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {  useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createOrder } from "../../state/Order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});

const Cart = () => {
  
  const [open, setOpen] = useState(false);
  const { cart,auth } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleOpenAddressModel = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit = (values) => {
    const data = {
      jwt:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0].food?.restaurant,
        deliveryAddress:{
          fullName:auth.user?.fullName,
          streetAddress:values.streetAddress,
          city:values.city,
          state:values.state,
          postalCode:values.pincode,
          country:"india"
        }
      }
    }
    
    dispatch(createOrder(data));
    handleClose();
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          { cart.cartItems?.length>0 ? cart.cartItems.map((item) => (
            <CartItem item={item} />
          )):<p className="text-center">No items in cart</p>}
          <Divider />
          <div className="billdetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>39</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>19</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total Pay</p>
              <p>{cart.cart?.total+39+19}</p>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address To Place Order
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleOpenAddressModel}
                  >
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    variant="outlined"
                    fullWidth
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //     <ErrorMessage>
                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    variant="outlined"
                    fullWidth
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //     <ErrorMessage>
                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //     <ErrorMessage>
                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    variant="outlined"
                    fullWidth
                    // error={!ErrorMessage("streetAddress")}
                    // helperText={
                    //     <ErrorMessage>
                    //         {(msg) => <span className='text-red-600'>{msg}</span>}
                    //     </ErrorMessage>
                    // }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Place Order
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
