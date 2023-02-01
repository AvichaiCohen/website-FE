import React from "react";
import "./Item.css";

function Item(props) {
  return (
    <div className="item">
      <div className="item__title">
        <h3>{props.title}</h3>
      </div>
      <img className="item__img" src={props.img} />
      <div className="item__price">
        <h4>{props.price}</h4>
      </div>
      <button className="item__button" type="submit">
        Add To Cart
      </button>
    </div>
  );
}
export default Item;
