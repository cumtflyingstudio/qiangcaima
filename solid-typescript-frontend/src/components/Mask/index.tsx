import { Component, createEffect, createSignal, Show } from 'solid-js';

const [className, setClassName] = createSignal('opacity-0');
const Mask: Component<{ show?: boolean; close: () => void }> = (props) => {
  createEffect(() => {
    setClassName(props.show ? 'opacity-100' : 'opacity-0');
  });
  return (
    <Show when={props.show}>
      <div
        onClick={(e) => {
          setClassName('opacity-0');
          setTimeout(() => {
            props.close();
          }, 500);
          e.preventDefault();
        }}
        classList={{ [className()]: true, 'flex justify-center items-center': true }}
        style="z-index:100;position: fixed;width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.85); color: rgb(232, 232, 232);transition:all 0.5s;"
      >
        {props.children}
      </div>
    </Show>
  );
};

export default Mask;
