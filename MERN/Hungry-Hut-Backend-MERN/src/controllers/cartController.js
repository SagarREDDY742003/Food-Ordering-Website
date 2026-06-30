import { addItemToCart, clearCart, findCartByUserId, removeCartItemFromCart, updateCartItemQuantity } from "../services/cartService.js";

export const addItemToCartController = async(req,res) => {
    try {
        const user = req.user;
        const cart = await addItemToCart(req.body,user._id);
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"internal server error"});
    }
} ;

export const updateCartItemQuantityController = async(req,res) => {
    try {
        const {cartItemId,quantity} = req.body;
        const cart = await updateCartItemQuantity(cartItemId,quantity);
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"internal server error"});
    }
} ;

export const removeItemFromCart = async(req,res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const cart = await removeCartItemFromCart(id, user);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const findUserCart = async(req,res) => {
    try {
        const user = req.user;
        const cart = await findCartByUserId(user._id.toString());
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"internal server error"});
    }
} ;

export const clearCartController = async(req,res) => {
    try {
        const user = req.user;
        const cart = await clearCart(user._id.toString());
        res.status(200).json(cart);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json({error:error.message});
        else
            res.status(500).json({error:"internal server error"});
    }
} ;