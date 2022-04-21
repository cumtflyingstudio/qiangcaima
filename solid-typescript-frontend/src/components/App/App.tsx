import { Component, createResource } from 'solid-js';
import GithubIcon from '../Icon/Github';
import { createMutable } from 'solid-js/store';
import Mask from '../Mask';
import HotList from '../HotList';
import Input from '../Input/index';
import getColorMap from '../../utils/getColorMap';

export interface IFood {
  name: string;
  quality: string;
  image: string;
}

export const store = createMutable({
  show: false,
  whatLuckyFood: { name: '', quality: '0', image: '' },
});

const App: Component = () => {
  return (
    <>
      <Mask
        show={store.show}
        close={() => {
          store.show = false;
        }}
      >
        <div
          class="flex items-center justify-center bg-white showHello"
          style="height:400px;width:400px;"
        >
          <div class="flex flex-col text-black">
            <div>
              你抽到了
              <span style={{ color: getColorMap(store.whatLuckyFood.quality).color }}>
                {getColorMap(store.whatLuckyFood.quality).quality}
              </span>
            </div>
            <img src={store.whatLuckyFood.image} alt="food图片" style="width:200px;height:200px;" />
            <div class="flex justify-center items-center">{store.whatLuckyFood.name}</div>
          </div>
        </div>
      </Mask>
      <div class="flex flex-col justify-center items-center">
        <Input />
        <div>
          <HotList />
        </div>
        <div class="flex flex-col justify-center items-center">
          <div class="flex flex-row justify-center items-center">
            <a href="https://github.com/SoonIter/qiangcaima">
              <GithubIcon />
            </a>
          </div>
          <div class="text-xs" style={{ color: '#92959e' }}>
            made by <a href="http://www.atcumt.com/">FlyingStudio_SoonIter & ZLj</a>
          </div>
          <div class="text-xs" style={{ color: '#92959e' }}>
            @copyright
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
