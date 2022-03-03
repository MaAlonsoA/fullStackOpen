import axios from 'axios';

export const getAllPersons = () => axios.get('https://infinite-refuge-78583.herokuapp.com/api/persons').then((response) => {
  const { data } = response;
  return data;
});
