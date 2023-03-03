import { useEffect, useState } from 'react';
import useLoginEffect from '../hooks/LoginEffect';
import IProps from '../interfaces/IProps';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import getTopSellers from '../utils/api/getTopSellers';

function Dashboard(props: IProps) {
  const [hiddeCart, setHiddeCart] = useState(true);
  const { userData, loading, cartInfo, setCartInfo, setLoading } = useLoginEffect(props.history);
  const [topSellers, setTopSellers] = useState([]);
  const roleUser = (userData.role === 'user');
  const [roleSeller, setRoleSellet] = useState(!(userData.role === 'seller' || userData.role === 'admin'))
  
  useEffect(() => {
    setLoading(true);
    const getSellers = async () => {
      const sellers = await getTopSellers();
      setTopSellers(sellers)
      setLoading(false);
    };
    getSellers();
  }, []);

  return (
    <>
        <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} name={userData.name} history={props.history} roleUser={roleUser} roleSeller={roleSeller} />
        <section className='min_height'>
        { loading ? <Loading />: (
          <div>
            <h3>Dashboard</h3>
            <h3>Vendedores com mais vendas:</h3>
            <div>
              {topSellers.map((seller: any) => {
                return (
                <div>
                  <span>{seller.name}</span>
                  <h6>Vendas: {seller.total_sales}</h6>
                </div>
                )
              })}
            </div>
            top 5 Produtos mais vendidos com quantidade e media de preço.
            
            top 5 Vendedores com maior faturamento9
          </div>
            ) }
        </section>
      <Footer setLoginOpen={() => {}} />
    </>
  );
}

export default Dashboard;
