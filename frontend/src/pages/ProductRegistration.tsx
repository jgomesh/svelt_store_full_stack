import { useState } from 'react';
import handleChange from '../utils/handleChange';
import useLoginEffect from '../hooks/LoginEffect';
import redirect from '../utils/redirect';
import createProduct from '../utils/api/createSale';
import IProps from '../interfaces/IProps';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ProductRegistration(props: IProps) {
  const [productData, setProductData] = useState({name:'', price: 0, url_image: ''});
  const [ hiddeCart, setHiddeCart] = useState(false);
  const { userData, loading } = useLoginEffect(props.history);
  const roleUser = (userData.role === 'user');
  const [roleSeller, setRoleSeller] = useState(!(userData.role === 'seller' || userData.role === 'admin'));

  return (
    <>
      <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} roleSeller={roleSeller} name={userData.name} history={props.history} roleUser={roleUser} />
      <section className='register_seller_product'>
        {loading ? <Loading /> : (
            <form>
              FORMULÀRIO PARA CRIAR PRODUTO
              <input value={productData.name} onChange={(event: any) => handleChange(event, setProductData, productData)} type="text" name="name" placeholder='Name of the product'/>
              <input value={productData.price} onChange={(event: any) => handleChange(event, setProductData, productData)}  type="number" name="price" placeholder='Price'/>
              <input value={productData.url_image} onChange={(event: any) => handleChange(event, setProductData, productData)}  type="text" name="url_image" placeholder='URL image'/>
              <button onClick={async (event: any) => {
                event.preventDefault();
                await createProduct(productData, 'product');
                setProductData({name:'', price: 0, url_image: ''});
                redirect(event, props.history, '/my_products')
              }}>
                CREATE PRODUCT  
              </button>
            </form>
        )}
      </section>
      <Footer setLoginOpen={() => {}} />
    </>
  );
}

export default ProductRegistration;
