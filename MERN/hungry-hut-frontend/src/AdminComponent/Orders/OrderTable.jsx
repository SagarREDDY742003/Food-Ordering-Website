import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsOrder,
  updateOrderStatus,
} from "../../state/RestaurantOrder/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = ({ filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const dispatch = useDispatch();
  const restaurant = useSelector((store) => store.restaurant.usersRestaurant);
  const orderBeforeFilter = useSelector(
    (store) => store.restaurantOrder.orders,
  );

  const orders =
    filter === "ALL"
      ? orderBeforeFilter
      : orderBeforeFilter?.filter((order) => order.orderStatus === filter);

  console.log(orders);

  useEffect(() => {
    if (!restaurant?.id) return;
    dispatch(
      getRestaurantsOrder({
        jwt: localStorage.getItem("jwt"),
        restaurantId: restaurant._id,
      }),
    );
  }, [dispatch, restaurant]);

  const handleOrderStatus = (orderStatus) => {
    if (!selectedOrderId) return;
    dispatch(
      updateOrderStatus({
        orderId: selectedOrderId,
        orderStatus,
        jwt: localStorage.getItem("jwt"),
      }),
    );
    handleClose();
  };
  if (orders.length!==0) {
    return (
      <Box>
        <Card className="mt-1">
          <CardHeader
            title={"All Orders"}
            sx={{ pt: 2, alignItems: "center" }}
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="orders table">
                <TableHead>
                  <TableRow>
                    {/* <TableCell align="center">Id</TableCell> */}
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Customer</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Ingredients</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Update</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {/* <TableCell align="center">{order.id}</TableCell> */}

                      <TableCell align="center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {order.items.map((item) => (
                            <Avatar
                              key={item._id}
                              src={item.food?.images?.[0] || ""}
                              alt={item.food?.name || "Food"}
                            />
                          ))}
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        {order.customer.fullName}
                      </TableCell>

                      <TableCell align="center">
                        {"₹" + order.totalAmount}
                      </TableCell>

                      <TableCell align="center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {order.items?.map((item) => (
                            <Chip key={item._id} label={item.food.name} />
                          ))}
                        </div>
                      </TableCell>

                      <TableCell align="center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {[
                            ...new Set(
                              order.items.flatMap((item) => item.ingredients),
                            ),
                          ].map((ingredient) => (
                            <Chip key={ingredient} label={ingredient} />
                          ))}
                        </div>
                      </TableCell>

                      <TableCell align="center">{order.orderStatus}</TableCell>

                      <TableCell align="center">
                        <Button
                          id={`update-status-btn-${order._id}`}
                          aria-controls={open ? "order-status-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(event) => handleClick(event, order._id)}
                          variant="outlined"
                        >
                          Update Status
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Single Menu controlled by anchorEl + selectedOrderId */}
              <Menu
                id="order-status-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                {orderStatus.map((item) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => handleOrderStatus(item.value)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    );
  } else {
    return(
      <div className="p-7" >
        <p className="text-2xl">No Orders</p>
      </div>
        
    )
  }
};

export default OrderTable;
