import { useEffect, useState } from 'react';
import useLoginEffect from '../hooks/LoginEffect';
import IProps from '../interfaces/IProps';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function Dashboard(props: IProps) {
  const [hiddeCart, setHiddeCart] = useState(true);
  const { userData, loading, cartInfo, setCartInfo, setLoading } = useLoginEffect(props.history);
  const roleUser = (userData.role === 'user');
  const [roleSeller, setRoleSellet] = useState(!(userData.role === 'seller' || userData.role === 'admin'))
  
  useEffect(() => {
    setLoading(true);
    const getSellers = async () => {
      setLoading(false);
    };
    getSellers();
  }, []);

  return (
    <>
        <Header hiddeCart={hiddeCart} setHiddeCart={setHiddeCart} name={userData.name} history={props.history} roleUser={roleUser} roleSeller={roleSeller} />
        <section className='min_height'>
        { loading ? <Loading />: (
          <>
            DASHBOARD:
            top 5 Produtos mais vendidos com quantidade e media de preço.
            top 5 Vendedor com mais vendas com produto campeão.
            top 5 Vendedores com maior faturamento9
          </>
            ) }
        </section>
      <Footer setLoginOpen={() => {}} />
    </>
  );
}

export default Dashboard;
