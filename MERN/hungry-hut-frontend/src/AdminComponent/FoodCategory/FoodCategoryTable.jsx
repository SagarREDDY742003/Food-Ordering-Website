import { Box, Card, CardHeader, IconButton, Modal } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Close, Create } from "@mui/icons-material";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import { useSelector } from "react-redux";

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

const FoodCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const categories = useSelector((store) => store.restaurant.categories);
  console.log(categories);

  return (
    <Box>
      <Card className="mt-1 w-fit">
        <CardHeader
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton aria-label="settings" onClick={handleOpen}>
              <Create />
            </IconButton>
          }
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 330 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="left">Id</TableCell> */}
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((item,index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={index}
                >
                  {/* <TableCell align="left">{item._id}</TableCell> */}
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal open={open}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
