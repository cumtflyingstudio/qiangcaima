import { Component, createSignal } from 'solid-js';
import './index.css';
import Button from '../Button';
import { IFood, store } from 'components/App/App';
import getRandomName from '../../utils/getRandomName';
import DiceIcon from '../Icon/DiceIcon';

import fetch_lucky_food from '../../service/fetch_lucky_food';
export const [name, setName] = createSignal(getRandomName());

const Input: Component = () => {
  return (
    <>
      <div class="namepicker">
        <p>起个名字：</p>
        <div class="flex flex-row justify-center items-center">
          <input
            id="names"
            value={name()}
            onInput={(e: any) => {
              setName(e.target?.value as string);
              console.log(e);
            }}
            type="text"
            placeholder="抢菜者姓名"
          />
          <div
            style="width:60px;"
            onClick={() => {
              setName(getRandomName());
            }}
          >
            <DiceIcon />
          </div>
        </div>
        <Button
          onClick={() => {
            store.show = true;
            void fetch_lucky_food(name()).then((res) => {
              store.whatLuckyFood = res as IFood;
            });
          }}
        />
      </div>
    </>
  );
};
export default Input;
