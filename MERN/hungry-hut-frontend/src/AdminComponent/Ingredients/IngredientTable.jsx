import { Box, Button, Card, CardHeader, IconButton, Modal } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Create } from "@mui/icons-material";
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { updateStockOfIngredient } from "../../state/Ingredients/Action";

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

const IngredientTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const ingredients =useSelector(store=>store.ingredients.ingredients);

  const handleStock=(id)=>{
    console.log(id);
    dispatch(updateStockOfIngredient({id,jwt:localStorage.getItem("jwt")}));
  }

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"Ingredients"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton aria-label="settings" onClick={handleOpen}>
              <Create />
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="right">Id</TableCell> */}
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Avaliability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients?.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="right">{item._id}</TableCell> */}
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.category.name}</TableCell>
                  <TableCell align="right"><Button onClick={()=>handleStock(item._id)} variant="outlined" color={item.inStock?"success":"warning"} >{item.inStock?"IN STOCK":"OUT OF STOCK"}</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientTable;
