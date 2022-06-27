const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApiAll = async () => {
  try {
    const data = await fetch(URL);
    return data.json();
  } catch (error) {
    return console.log(error);
  }
};

export default fetchApiAll;
