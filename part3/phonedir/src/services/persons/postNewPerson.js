import axios from 'axios';

export const postNewPerson = (newPerson) => axios
  .post('https://infinite-refuge-78583.herokuapp.com/api/persons', newPerson)
  .then((response) => {
    const { data } = response;
    return data;
  });
