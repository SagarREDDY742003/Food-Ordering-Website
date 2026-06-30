import { Button, Card } from "@mui/material";


const OrderCard = ({ order }) => {
  
  return (
    <div className="mx-2 p-4 flex bg-slate-800 flex-col gap-2 items-center w-[20rem]">
      {order.items.map((item) => (
        <Card className="flex justify-between items-center p-4 sm:mx-4 w-full">
          <div className="flex items-center space-x-5">
            <img className="w-16 h-16" src={item.food.images[0]} alt="food" />
            <div>
              <p>{item.food.name}</p>
              <p>
                <span className="text-gray-400">{"quantity: "}</span>
                {item.quantity}
              </p>
              <p>
                <span className="text-gray-400">{"price: ₹"}</span>
                {item.totalPrice}
              </p>
              <div className="w-full flex flex-wrap gap-2">
                {item.ingredients?.map((ingredient) => (
                  <p className="text-xs p-1 bg-slate-800 rounded">{ingredient}</p>
                ))}
              </div>
            </div>
          </div>
        </Card>
      ))}
      <div className="flex w-full items-baseline justify-evenly">
        <p>
          <span className="text-gray-400">{"Total price: ₹"}</span>
          {order.totalAmount}
        </p>
        <Button className="cursor-not-allowed">{order.orderStatus}</Button>
      </div>
    </div>
  );
};

export default OrderCard;
