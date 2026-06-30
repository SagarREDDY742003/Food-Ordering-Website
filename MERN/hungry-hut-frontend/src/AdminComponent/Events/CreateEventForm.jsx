import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import React, {  useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../state/Restaurant/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 340,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  imageUrl: "",
  location: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const CreateEventForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.usersRestaurant);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      startedAt: formValues.startedAt?.format("MMMM DD, YYYY hh:mm A"),
      endsAt: formValues.endsAt?.format("MMMM DD, YYYY hh:mm A"),
    };
    console.log("data", payload);
    dispatch(createEvent({ data: payload, jwt: localStorage.getItem("jwt"), restaurantId: restaurant?._id }));
    setFormValues(initialValues);
    handleClose();
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({
      ...formValues,
      [dateType]: date,
    });
  };

  return (
      <div className="p-5">
        <Button onClick={handleOpen} variant="contained">
          Create new Event
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="imageUrl"
                    label="Image URL"
                    variant="outlined"
                    fullWidth
                    value={formValues.imageUrl}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="location"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Start Date and Time"
                      renderInput={(props) => <TextField {...props} />}
                      value={formValues.startedAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "startedAt")
                      }
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="End Date and Time"
                      renderInput={(props) => <TextField {...props} />}
                      value={formValues.endsAt}
                      onChange={(newValue) =>
                        handleDateChange(newValue, "endsAt")
                      }
                      inputFormat="MM/dd/yyyy h:mm a"
                      className="w-full"
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                  >
                    Create Event
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
  );
};

export default CreateEventForm;
