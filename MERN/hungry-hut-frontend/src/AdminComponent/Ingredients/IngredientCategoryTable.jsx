import { Box, Card, CardHeader, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Create } from "@mui/icons-material";
import CreateIngredientsCategoryForm from "./CreateIngredientsCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategory } from "../../state/Ingredients/Action";

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

const IngredientCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const restaurant = useSelector(store=>store.restaurant.usersRestaurant)
  const ingredientCategories =useSelector(store=>store.ingredients.categories);

  useEffect(()=>{
    dispatch(getIngredientCategory({id:restaurant._id,jwt:localStorage.getItem("jwt")}))
  },[dispatch,restaurant])

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"Ingredient Category"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton aria-label="settings" onClick={handleOpen}>
              <Create />
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="left">Id</TableCell> */}
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientCategories?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="left">{item._id}</TableCell> */}
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateIngredientsCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientCategoryTable;
