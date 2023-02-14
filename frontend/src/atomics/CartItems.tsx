import CartItem from "./CartItem";
import ICarInfo from "../interfaces/ICarInfo";

function CartItems({cartInfo, setCartInfo, setDisabled }: {cartInfo: ICarInfo, setCartInfo: Function, setDisabled: Function }) {
  
  return (
      <>
        {cartInfo.sales_products && cartInfo.sales_products.map((product: any, index: number) => (
          <CartItem key={`cart-${index}`} product={product} setDisabled={setDisabled} setCartInfo={setCartInfo} cartInfo={cartInfo}/>
         ))
        }
      </>
  );
}

export default CartItems;
