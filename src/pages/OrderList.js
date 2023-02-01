import { usernamelog } from "../components/registration/Login";
import CardOrder from "../components/store/CardOrder";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList() {
  const url = new URL("http://localhost:8080/website/item/order/get/list/");
  const params = { username: usernamelog };
  const userOrder = {
    username: usernamelog,
    orderDate: null,
    totalprice: null,
    shippingAddress: null,
    orderStatus: null,
  };
  for (const key in params) {
    url.searchParams.append(key, params[key]);
  }
  const [items, setItems] = useState();
  const getApiData = async () => {
    const response = await fetch(url).then((response) => response.json());
    setItems(response);
  };

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <h1>Order List</h1>
      <button
        onClick={() => {
          axios.create(
            "http://localhost:8080/website/order/create/",
            userOrder
          );
        }}
      >
        Order This Cart
      </button>
      <div className="itemGrid">
        {items &&
          items.map((item) => (
            <CardOrder
              img={item.photo}
              title={item.title}
              price={item.price}
              availableInStock={item.inStock}
              id={item.itemID}
            />
          ))}
      </div>
    </>
  );
}
