import { Component, For, createSignal, onCleanup } from 'solid-js';
import Box from '../index';

const [list] = createSignal(Array.from({ length: 8 }, (v, k) => k));
const BoxList: Component = () => {
  return <div>
    <For each={list()} fallback={<div>loading...</div>}>
      {(item, index) => (<Box>{item}</Box>)}
    </For>
  </div>;
};


export default BoxList;
