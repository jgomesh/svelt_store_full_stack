import { useEffect, useState } from 'react';
import useLoginEffect from '../hooks/LoginEffect';
import IProps from '../interfaces/IProps';
import SellItem from '../components/SellItem';
import getUserSells from '../utils/api/getUserSells';
import Header from '../components/Header';

function SellerSells(props: IProps) {
  const { userData, loading, setLoading } = useLoginEffect(props.history);
  const [sellerSells, setSellerShops] = useState([]);
  const [hiddeCart, setHiddeCart] = useState(false);
  const roleUser = (userData.role === 'user');
  const roleSeller = (userData.role === 'seller' || userData.role === 'admin');

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const sales = await getUserSells('seller_sells');

      setSellerShops(sales.sales);
      if(!sales.sales) {
        return false;
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      {loading ? "Loading..." : (
        <section>
          <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} name={userData.name} history={props.history} roleUser={roleUser} roleSeller={roleSeller} />
          {sellerSells.map((sell: any, index: number) => (
            <SellItem key={index} sell={sell} />
          )).reverse()}
        </section>
      )}
    </>
  );
}

export default SellerSells;
