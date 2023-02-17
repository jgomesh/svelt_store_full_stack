import { useEffect, useState } from 'react';
import useLoginEffect from '../hooks/LoginEffect';
import IProps from '../interfaces/IProps';
import Cart from '../components/Cart';
import Product from '../components/Product';
import getSellerProducts from '../utils/api/getSellerProducts';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

function SellerDetails(props: IProps) {
  const [sellerProducts, setSellerProducts] = useState([]);
  const [ hiddeCart, setHiddeCart] = useState(true);
  const { userData, loading, setLoading, cartInfo, setCartInfo } = useLoginEffect(props.history);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const products = await getSellerProducts('my_products', props.match.params.id);
      setSellerProducts(products.products);
      setLoading(false);
      console.log(sellerProducts)
    };
    getProducts();
  }, []);

  const roleUser = (userData.role === 'user');
  const roleSeller = (userData.role === 'seller' || userData.role === 'admin');
  return (
    <>
      <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} name={userData.name} history={props.history} roleUser={roleUser} roleSeller={roleSeller} />
      <section>
        {loading ? <Loading /> : (
          <>
            { userData.role && roleUser && <Cart setHiddeCart={setHiddeCart} hiddeCart={hiddeCart} cartInfo={cartInfo} setCartInfo={setCartInfo} history={props.history} finishPayment={false} setDisabled={() => {}} /> }
            {sellerProducts.map((product: any, index: number) => (
              <Product userId={userData.userId} key={index} product={product} setCartInfo={setCartInfo} cartInfo={cartInfo} />
            ))}
          </>
        )}
      </section>
      <Footer setLoginOpen={() => {}} />
    </>
  );
}

export default SellerDetails;
