import useLoginEffect from '../hooks/LoginEffect';
import { useState } from 'react';
import IProps from '../interfaces/IProps';
import deleteItem from '../utils/api/deleteItem';
import getSellerProducts from '../utils/api/getSellerProducts';
import Header from '../components/Header';

function SellerProducts(props: IProps) {
  const { userData, loading, setLoading, setSellerProducts, sellerProducts } = useLoginEffect(props.history);
  const [hiddeCart, setHiddeCart] = useState(false);
  const roleUser = (userData.role === 'user');
  const roleSeller = (userData.role === 'seller' || userData.role === 'admin');
  return (
    <>
      {loading ? "Loading..." : (
        <section>
          <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} name={userData.name} history={props.history} roleUser={roleUser} roleSeller={roleSeller} />
          {sellerProducts.map((product: any, index: number) => (
            <div key={index}>
              <h4>{product.name}</h4>
              <img src={product.url_image} alt={product.name} />
              <p>price {product.price}</p>
              {roleSeller && (
                <button onClick={async () => {
                  setLoading(true);
                  await deleteItem('product', product.id);
                  const data = await getSellerProducts('my_products', product.seller_id);
                  setSellerProducts(data.products);
                  setLoading(false);
                }}>
                  DELETE PRODUCT
                </button>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
}

export default SellerProducts;
