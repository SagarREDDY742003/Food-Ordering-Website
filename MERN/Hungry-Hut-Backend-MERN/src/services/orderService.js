import Address from "../models/address.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Restaurant from "../models/restaurant.model.js";
import { calculateCartTotals, findCartByUserId } from "./cartService.js";
import { createPaymentLink } from "./paymentService.js";

export async function createOrder(order, user) {
  try {
    const address = order.deliveryAddress;
    let savedAddress;
    if (!address) {
      throw new Error("deliveryAddress is required");
    }
    if (address._id) {
      const isAddressExist = await Address.findById(address._id);
      if (isAddressExist) savedAddress = isAddressExist;
      else {
        // const shippingAddress = new Address(order.deliveryAddress);
        savedAddress = await new Address(order.deliveryAddress).save();
      }
    } else {
      savedAddress = await new Address(order.deliveryAddress).save();
    }
    if (!user.addresses.includes(savedAddress._id)) {
      user.addresses.push(savedAddress._id);
      await user.save();
    }

    const restaurant = await Restaurant.findById(order.restaurantId);
    if (!restaurant) throw new Error("Restaurant not found");

    const cart = await findCartByUserId(user._id);
    if (!cart) throw new Error("Cart not found");

    let orderItems = [];
    for (const item of cart.items) {
      const orderItem = new OrderItem({
        food: item.food,
        ingredients: item.ingredients,
        quantity: item.quantity,
        totalPrice: item.food.price * item.quantity,
      });
      const savedOrderItem = await orderItem.save();
      orderItems.push(savedOrderItem._id);
    }

    const newOrder = new Order({
      customer: user._id,
      deliveryAddress: savedAddress._id,
      createdAt: new Date(),
      orderStatus: "PENDING",
      totalAmount: cart.total,
      restaurant: restaurant._id,
      items: orderItems,
    });
    const savedOrder = await newOrder.save();
    restaurant.orders.push(savedOrder._id);
    await restaurant.save();

    const paymentResponse = await createPaymentLink(savedOrder);
    return paymentResponse;
  } catch (error) {
    throw new Error("Failed to create order");
  }
}

export async function cancelOrder(orderId) {
  try {
    await Order.findByIdAndDelete(orderId);
  } catch (error) {
    throw new Error("Failed to cancel order");
  }
}

export async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("order not found");
    return order;
  } catch (error) {
    throw new Error("Failed to find order");
  }
}

export async function getUserOrders(userId) {
  try {
    const orders = await Order.find({ customer: userId }).populate({
      path: "items",
      populate: { path: "food", select: "images" },
    });
    return orders;
  } catch (error) {
    throw new Error("Failed to get user orders.");
  }
}

export async function getOrdersOfRestaurant(restaurantId, orderStatus) {
  try {
    const orders = await Order.find({ restaurant: restaurantId }).populate({
      path: "items",
      populate: {
        path: "food",
        select: "name images", // include fields you need
      },
    });
    if (orderStatus) {
      orders = orders.filter((order) => order.orderStatus === orderStatus);
    }
    return orders;
  } catch (error) {
    throw new Error("Failed to get orders of restaurant.");
  }
}

export async function updateOrderStatus(orderId, orderStatus) {
  try {
    const validStatus = [
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "COMPLETED",
      "PENDING",
    ];
    if (!validStatus.includes(orderStatus)) {
      throw new Error("invalid order status.");
    }
    const order = await Order.findById(orderId).populate({
      path: "items",
      populate: {
        path: "food",
        select: "name images", // include fields you need
      },
    });
    if (!order) throw new Error("order not found.");
    order.orderStatus = orderStatus;
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Failed to update order status.");
  }
}
