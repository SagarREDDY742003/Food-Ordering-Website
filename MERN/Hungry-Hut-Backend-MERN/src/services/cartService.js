import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";
import Food from "../models/food.model.js";

export const createCart = async(user) =>{
    const cart = new Cart({customer:user});
    const createdCart = await cart.save();
    return createdCart;
};

export const findCartByUserId = async(userId) => {
    let cart = await Cart.findOne({customer:userId}).populate([
        {
            path:"items",
            populate:{
                path:"food",
                populate:{
                    path:"restaurant",
                    select:"_id"
                },
            },
        }
    ]);
    if(!cart) throw new Error("Cart not found");

    let cartItems = await CartItem.find({cart:cart._id}).populate("food");
    cart.items = cartItems; 
    cart.total = await calculateCartTotals(cart);
    return cart;
};

export const addItemToCart = async (req, userId) => {
  let cart = await Cart.findOne({ customer: userId });
  if (!cart) cart = await createCart(userId);

  const food = await Food.findById(req.foodId);

  let item = await CartItem.findOne({
    cart: cart._id,
    food: food._id,
  });

  if (!item) {
    item = new CartItem({
      food: food._id,
      cart: cart._id,
      quantity: 1,
      ingredients: req.ingredients,
      totalPrice: food.price,
    });
    await item.save();
    cart.items.push(item);
  } else {
    item.quantity += 1;
    item.totalPrice = item.quantity * food.price;
    await item.save();
  }

  await cart.save();

  // ✅ populate food before returning
  const populatedItem = await CartItem.findById(item._id).populate("food");
  return populatedItem;
};


export const updateCartItemQuantity = async(cartItemId,quantity) => {
  const cartItem = await CartItem.findById(cartItemId).populate([
    {path:"food",populate:{path:"restaurant",select:"_id"}},
  ]);
  if(!cartItem) throw new Error('cart item not found');

  if (quantity <= 0) {
    await CartItem.findByIdAndDelete(cartItemId);
    return { removed: true, cartItemId };
  }

  cartItem.quantity = quantity;
  cartItem.totalPrice = quantity * cartItem.food.price;
  await cartItem.save();
  return cartItem;
};


export const removeCartItemFromCart = async(cartItemId, user) => {
  const cart = await Cart.findOne({ customer: user._id });
  if (!cart) throw new Error('cart not found');

  // Delete the CartItem document
  await CartItem.findByIdAndDelete(cartItemId);

  // Remove reference from cart.items
  cart.items = cart.items.filter(item => !item.equals(cartItemId));
  await cart.save();

  // Return fully populated cart
  const populatedCart = await Cart.findById(cart._id).populate({
    path: "items",
    populate: {
      path: "food",
      populate: { path: "restaurant", select: "_id" }
    }
  });

  populatedCart.total = await calculateCartTotals(populatedCart);
  return populatedCart;
};



export const clearCart = async(id) => {
    const cart = await Cart.findOne({customer:id});
    if(!cart) throw new Error('cart not found');
    cart.items=[];
    await cart.save();
    return cart;
}

export const calculateCartTotals = async(cart) => {
    try {
        let total=0;
        for(let item of cart.items){
            total += item.totalPrice;
        }
        return total;
    } catch (error) {
        throw new Error(error.message)
    }
}