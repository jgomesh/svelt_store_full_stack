import { useState, useEffect } from 'react';
import ICarInfo from '../interfaces/ICarInfo';
import getProducts from '../utils/api/getAdminProducts';
import Product from './Product';
import { Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';

function AdminProducts({ setCartInfo, cartInfo, userId }: {setCartInfo: Function, cartInfo: ICarInfo, userId: number}) {
  const [productsData, setProducts] = useState({ products: [] } );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const requestData = async () => {
      const products = await getProducts();

      setProducts(products);

      setLoading(false);
      return products;
    }
    requestData();
  }, []);

  return (
    <section className='admin__products__container'>
      {loading ? "Loading..." : (
        <>
          <Swiper
            className='my_swipper'
            slidesPerView={1.7}
            spaceBetween={20}  
            breakpoints={{
            1200: {
              slidesPerView: 3,
            },
          }}>
            {productsData.products.map((product: { id: number, name: string, url_image: string, price: string, seller_id: number}, index: number) => (
              <SwiperSlide>
                <Product userId={userId} key={index} product={product} setCartInfo={setCartInfo} cartInfo={cartInfo} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
}

export default AdminProducts;