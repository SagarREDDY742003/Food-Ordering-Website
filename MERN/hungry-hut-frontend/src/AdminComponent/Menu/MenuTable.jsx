import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Create, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenuItem, getMenuItemsByRestaurantId, updateMenuItemsAvaliability } from "../../state/Menu/Action";

const MenuTable = () => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const usersRestaurant = useSelector(
    (store) => store.restaurant.usersRestaurant
  );
  const menu = useSelector((store) => store.menu.menuItems);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        restaurantId: usersRestaurant?._id,
        jwt: jwt,
      })
    );
  }, [dispatch,jwt,usersRestaurant]);

  const handleMenuAvaliability=(id)=>{
    dispatch(updateMenuItemsAvaliability({foodId:id,jwt:localStorage.getItem("jwt")}))
  }

  const handleMenuDeletion=(id)=>{
    dispatch(deleteMenuItem({foodId:id,jwt:localStorage.getItem("jwt")}))
  }

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"All Menu Items"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurant/addMenu")}
              aria-label="settings"
            >
              <Create />
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Avaliability</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.map((menuItem) => (
                <TableRow
                  key={menuItem._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Avatar src={menuItem?.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="center">{menuItem.name}</TableCell>
                  <TableCell align="center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {menuItem.ingredients?.map((ingredient) => (
                        <Chip label={ingredient.name} sx={{ width: "100px" }} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {"₹ " + menuItem.price + " /-"}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={()=>handleMenuAvaliability(menuItem._id)} variant="contained" color={menuItem.available ? "success" : "warning"}>
                      {menuItem.available ? "Avaliable" : "Not Avaliable"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={()=>handleMenuDeletion(menuItem._id)}>
                      <Delete className="text-red-600" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
