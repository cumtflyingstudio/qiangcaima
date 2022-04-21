import { Component, createMemo } from 'solid-js';
import './HotItem.css';
import getColorMap from '../../utils/getColorMap';
import { IFood } from '../App/App';
import moment from 'moment';
export interface IResponse {
  insert_time: string;
  user_name: string;
  foodName: string;
  quality: string;
}
moment.locale('zh-cn');
const HotItem: Component<{ food: IResponse; username: string; time: string }> = (props) => {
  const getValue = createMemo(() => getColorMap(props.food.quality));
  return (
    <div class="HotItem flex justify-between">
      <div>
        用户
        <span class="font-bold pl-5 pr-5">{props.username || '无名氏'}</span>
        抽中了
        <span style={{ color: getValue().color }}>{props.food.foodName}</span>
      </div>
      <div style={{ color: 'gray' }}>{moment(props.time).fromNow()}</div>
    </div>
  );
};

export default HotItem;
