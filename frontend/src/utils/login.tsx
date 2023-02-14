import requestLoginOrSignin from "./api/requestLoginOrSignin";
import IUserInfo from "../interfaces/IUserInfo";

const login = async (event: Event, setLoading: Function, userInfo: IUserInfo, setError: Function, history: { push: Function } ) => {
  event.preventDefault();
  setLoading(true);
  await requestLoginOrSignin(userInfo, 'login');
  const token: string | null = localStorage.getItem('token');

  if(!token || !token.length) {
    setError(true);
  } else {
    setError(false);
    history.push('/home');
  }
  setLoading(false);
}

export default login;