import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { categorizeIngredients } from "../util/CategorizeIngredients";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../state/Cart/Action";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "../util/Toast";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item._id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    navigate("/cart");
    Toast("Item added to cart!","add-item-to-cart");
  };

  const handleCheckBoxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover rounded-lg"
                src={item.images[0]}
                alt=""
              />
            </div>
            <div className="space-y-1 lg:pl-4 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizeIngredients(item.ingredients)).map(
                (category) => (
                  <div>
                    <p>{category}</p>
                    <FormGroup>
                      {categorizeIngredients(item.ingredients)[category].map(
                        (item) => (
                          <FormControlLabel
                            key={item.name}
                            control={
                              <Checkbox
                                onChange={() => handleCheckBoxChange(item.name)}
                              />
                            }
                            label={item.name}
                          />
                        )
                      )}
                    </FormGroup>
                  </div>
                )
              )}
            </div>
            <div>
              <Button
                variant="contained"
                disabled={item.available ? false : true}
                type="submit"
                className="pt-5"
              >
                {item.available ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
