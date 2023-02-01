import SearchBar from "../components/layout/SearchBar";
import Card from "../components/store/Card";
import { useEffect, useState } from "react";
export default function ItemList() {
  const [items, setItems] = useState();
  const [error, setError] = useState("");
  const getApiData = async () => {
    const response = await fetch("http://localhost:8080/website/item/getAll")
      .then((response) => response.json())
      .catch((error) => {
        console.log("Got an error when calling api:" + error.message());
        throw error;
      });
    setItems(response);
  };
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      <SearchBar placeholder="Enter a Product Name..." data={items} />
      <div className="itemGrid">
        {error && <h3>{error}</h3>}
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
    </div>
  );
}
