import { useEffect, useState } from 'react';
import useLoginEffect from '../hooks/LoginEffect';
import Cart from '../components/Cart';
import IProps from '../interfaces/IProps';
import ProductsDetails from '../components/ProductsDetails';
import getUserSells from '../utils/api/getUserSells';
import Header from '../components/Header';

function UserShops(props: IProps) {
  const { userData, loading, cartInfo, setCartInfo } = useLoginEffect(props.history);
  const [ hiddeCart, setHiddeCart] = useState(false);
  const [userShops, setUserShops] = useState([]);
  const roleUser = (userData.role === 'user');
  const roleSeller = (userData.role === 'seller' || userData.role === 'admin');

  useEffect(() => {
    const getData = async () => {
      const sales = await getUserSells('user_sells');
      setUserShops(sales.sale);
      if(!sales.sale.length) {
        return false;
      }
    };
    getData();
  }, []);

  return (
    <>
      {loading ? "Loading..." : (
        <section>
          <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} roleSeller={roleSeller} name={userData.name} history={props.history} roleUser={roleUser} />
          <Cart setHiddeCart={setHiddeCart} hiddeCart={hiddeCart} cartInfo={cartInfo} setCartInfo={setCartInfo} history={props.history} finishPayment={false} setDisabled={() => {}} />
          <ProductsDetails userShops={userShops} history={props.history}/>
        </section>
      )}
    </>
  );
}

export default UserShops;
