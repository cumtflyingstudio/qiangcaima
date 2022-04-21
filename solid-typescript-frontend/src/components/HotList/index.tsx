//@ts-nocheck
import { Component, For } from 'solid-js';
import { io } from 'socket.io-client';
import { createMutable } from 'solid-js/store';
import HotItem, { IResponse } from './HotItem';
import { ws_url } from '../../service/base_url';
import moment from 'moment';
const socket = io(ws_url);
const state = createMutable({
  list: [] as IResponse[],
});
socket.on('latestMessage', (messages) => {
  console.log('websocket连接成功', messages as IResponse[]);
  state.list.push(...messages);
});
socket.on('goodLuck', (message) => {
  console.log('websocket连接成功', message as any);

  state.list.push({
    foodName: message.name,
    insert_time: moment(message.current_time).add(8, 'hours'),
    quality: message.quality,
    user_name: message.username,
  });
});

const HotList: Component = (props) => {
  return (
    <For each={state.list}>
      {(item) => <HotItem time={item.insert_time} username={item.user_name} food={item} />}
    </For>
  );
};
export default HotList;
