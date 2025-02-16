import { useContext, useEffect } from "react";
import { useWishlist } from "../../contexts/WishListContext";
import { CarouselComponent } from "../../components/CarouselComponent";
import { ContentCard } from "../../components/ContentCard";
export function Wishlist(){
  const { wishlist } = useWishlist();
  useEffect(()=>{
  },[wishlist])
  return (
    <div className=" grid grid-cols-6 gap-4 mt-20"> 
      {wishlist.map((c,i) => {
        return <ContentCard key={i} content={c} type={c.original_title ? "movie" : "tv"} /> 
      })}
    </div>
  )

}

// <ContentCard genreName={"Wishlist"} content={wishlist} />