import Header from '../components/Header';
import { useState } from 'react';
import useLoginEffect from '../hooks/LoginEffect';
import IProps from '../interfaces/IProps';
import FinishForm from '../components/FinishForm';

function FinishPayment(props: IProps) {
  const [hiddeCart, setHiddeCart] = useState(true);
  const { userData, disabled, setDisabled, loading, cartInfo, setCartInfo } = useLoginEffect(props.history);
  const roleUser = (userData.role === 'user');
  const roleSeller = (userData.role === 'seller' || userData.role === 'admin');
  return (
    <>
      {loading ? "Loading..." : (
        <section>
          <Header
            hiddeCart={hiddeCart}
            setHiddeCart={setHiddeCart}
            roleUser={roleUser}
            name={userData.name}
            history={props.history}
            roleSeller={roleSeller}
          />
          <FinishForm
            hiddeCart={hiddeCart}
            setHiddeCart={setHiddeCart}
            loading={loading}
            history={props.history}
            setCartInfo={setCartInfo}
            cartInfo={cartInfo}
            setDisabled={setDisabled}
            disabled={disabled}
          />
        </section>
      )}
    </>
  );
}

export default FinishPayment;
