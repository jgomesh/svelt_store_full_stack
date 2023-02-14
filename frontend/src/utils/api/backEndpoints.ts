const REACT_APP_BACKEND_HOST = 'localhost'
const REACT_APP_BACKEND_PORT = '3001'

const BASE_URL = `http://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}`;

const endpoints: any =  {
  auth: `${BASE_URL}/auth`,
  start: `${BASE_URL}/restart`,
  stop: `${BASE_URL}/stop`,
  login: `${BASE_URL}/login`,
  status: `${BASE_URL}/status`,
  cancel_status: `${BASE_URL}/cancel_status`,
  sellers: `${BASE_URL}/sellers`,
  my_products: `${BASE_URL}/my_products`,
  products: `${BASE_URL}/products`,
  product: `${BASE_URL}/product`,
  user_sells: `${BASE_URL}/user_sells`,
  seller_sells: `${BASE_URL}/seller_sells`,
  seller_name: `${BASE_URL}/seller_name`,
  register: `${BASE_URL}/register`,
  sell: `${BASE_URL}/sell`,
};

export default endpoints;