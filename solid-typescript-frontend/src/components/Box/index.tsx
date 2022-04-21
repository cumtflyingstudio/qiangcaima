import { Component, createSignal } from 'solid-js';

const Box: Component = () => {
  const [xy, setXY] = createSignal({ x: 0, y: 0 });
  const [initXY, init] = createSignal({ x: 0, y: 0 });

  return (
    <>
      <div
        onTouchStart={(e) => {
          setXY({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
          e.preventDefault();
        }}
        onTouchMove={(e) => {
          const x = e.changedTouches[0].clientX - xy().x;
          const y = e.changedTouches[0].clientY - xy().y;
          setXY({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
          init({ x: initXY().x + x, y: initXY().y + y });
          e.preventDefault();
        }}
        style={{
          height: '200px',
          width: '200px',
          transform: `translate(${initXY().x}px,${initXY().y}px)`,
          background: 'pink',
        }}
      >
        hello
      </div>
    </>
  );
};

export default Box;
