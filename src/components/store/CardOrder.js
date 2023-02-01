import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./CardOrder.css";
import { usernamelog } from "../registration/Login";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export default function MediaCard(props) {
  const params = {
    username: usernamelog,
    itemId: props.id,
  };
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
          size="small"
          className="deleteFromCart"
          onClick={(e) => {
            const deleteUrl = new URL(
              "http://localhost:8080/website/item/order/delete"
            );
            for (const key in params) {
              deleteUrl.searchParams.append(key, params[key]);
            }
            axios.delete(deleteUrl);
          }}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
