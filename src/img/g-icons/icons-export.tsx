import info from "./info.png";
import cartb from "./cart-b.png";
import userb from "./user-b.png";
import favoriteb from "./favorite-b.png";
import React from "react";

export const infoImg = info;
export const CartBImg = () => {return(<img src={cartb} alt="cartb" width={25} style={{marginRight:8}} />)};
export const UserBImg = () => {return(<img src={userb} alt="userb" width={25} style={{marginRight:8}} />)};
export const FavoriteBImg = () => {return(<img src={favoriteb} alt="favoriteb" width={25} style={{marginRight:8}} />)};
