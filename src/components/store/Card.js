import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Card.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { usernamelog } from "../registration/Login";
import { useLocation } from "react-router-dom";

export default function MediaCard(props) {
  const orderList = {
    username: usernamelog,
    itemId: props.id,
    quantityOfItem: 1,
  };
  const homeIsActive = useLocation().pathname;
  const userAndHome = usernamelog !== null && homeIsActive !== "/";
  return (
    <Card sx={{ width: 200, height: 400 }} className="Card">
      <CardMedia sx={{ height: 140 }} image={props.img} title={props.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price:{props.price}
          <br />
          Available Items: {props.availableInStock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={userAndHome}
          size="small"
          className="addToCart"
          onClick={(e) => {
            fetch("http://localhost:8080/website/item/order/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: orderList.username,
                itemId: orderList.itemId,
                quantityOfItem: orderList.quantityOfItem,
              }),
            });
          }}
        >
          <AddShoppingCartIcon></AddShoppingCartIcon>
        </Button>
        <Button
          disabled={userAndHome}
          size="small"
          className="addToFavorite"
          onClick={(e) => {
            fetch("http://localhost:8080/website/item/favourite/add", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: orderList.username,
                itemId: orderList.itemId,
                quantityOfItem: orderList.quantityOfItem,
              }),
            });
          }}
        >
          <FavoriteBorderSharpIcon></FavoriteBorderSharpIcon>
        </Button>
      </CardActions>
    </Card>
  );
}
