const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApiAll = async () => {
  const data = await fetch(URL);
  return data.json();
};

export default fetchApiAll;
