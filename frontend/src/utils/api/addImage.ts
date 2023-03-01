import backEndpoints from './backEndpoints';
import axios from 'axios';

const addImage = async (formData: FormData) => {
  const token: any = localStorage.getItem('token');

  if(!token.length) {
    return 'There is something wrong with your login';
  } else {
    return await axios.post(
      backEndpoints['add_image'],
      formData,
      { headers: { authorization: token}}
    ).then(res => {
      return res.data;
    }).catch((error) => {
      console.log(error.message);
      return error;
    });
  }
};

export default addImage;