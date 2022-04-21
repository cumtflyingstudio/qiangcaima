import { IFood } from 'components/App/App';
import base_url from './base_url';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function fetch_lucky_food(name: string) {
  const myHeaders = new Headers();
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  // @ts-ignore
  try {
    // @ts-ignore
    const response = await fetch(base_url + `/api/luck?username=${name}`, requestOptions);

    const { data } = await response.json();
    console.log('抽一次奖', data);
    return data as IFood;
  } catch (error) {
    return console.log('error', error);
  }
}

export default fetch_lucky_food;
