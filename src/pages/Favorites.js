import { usernamelog } from "../components/registration/Login";
import Card from "../components/store/Card";
import { useEffect, useState } from "react";

export default function Favorites() {
  const url = new URL("http://localhost:8080/website/item/favourite/get/list/");
  const params = { username: usernamelog };
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
      <h1>Favourite List</h1>
      <div className="itemGrid">
        {items &&
          items.map((item) => (
            <Card
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
