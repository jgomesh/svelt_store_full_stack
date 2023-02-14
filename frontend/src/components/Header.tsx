import logout from '../utils/logout';
import redirect from '../utils/redirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faCartShopping, faBagShopping } from '@fortawesome/free-solid-svg-icons';

function Header({ history, name, roleUser, roleSeller,  setHiddeCart, hiddeCart }: { history: { push: Function }, name: string, roleUser: boolean, roleSeller: any, setHiddeCart: Function, hiddeCart: boolean } ) {
  if(name === 'AxiosError') {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    redirect({ preventDefault: () => {}}, history, '/')
  }
  return (
    <header>
      <span className='logo' onClick={(event) => redirect(event, history, '/home')}>Svelt</span>
      <nav className='nav__container'>
        <button onClick={(event) => redirect(event, history, ( roleUser ? '/my_shopping' : '/my_sells' ))}>
          { roleUser ? <FontAwesomeIcon icon={faBagShopping}/> : "My Sells" }
        </button>
        { roleUser ? <button onClick={() => setHiddeCart(!hiddeCart)}><FontAwesomeIcon onMouseEnter={() => console.log('teste')} icon={faCartShopping}/></button> : "" }
        {roleSeller && (
          <button onClick={(event) => redirect(event, history, '/new_product')}>
            New Product
          </button>
        )}
        {roleSeller && (
          <button onClick={(event) => redirect(event, history, '/my_products')}>
            My Products
          </button>
        )}
        <button onClick={() => logout(history)}>
          <FontAwesomeIcon icon={faSignOut}/>
        </button>
      </nav>
    </header>
  );
}

export default Header;