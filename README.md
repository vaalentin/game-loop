# @vaalentin/game-loop

Simple game loop.

## Installation

```
$ npm install --save @vaalentin/game-loop
```

## Usage

```js
import GameLoop from '@vaalentin/game-loop';

const loop = new GameLoop(30);

loop.addEventListener('init', () => {
  // called once
});

loop.addEventListener('update', dt => {
  // called 30 times per second
});

loop.addEventListener('render', dt => {
  // called as fast as possible.
});
```

## API

#### `loop = new GameLoop(fps, speed)`

Where `fps` is a number that dictates how many times per second the `update` will be called.
This is used to get a constant timestep (default is 60).
`speed` is a number from (usually from `0` to `2`), to increase/reduce the timestep (default is `1`).

#### `loop.start()`

Start loop.

#### `loop.stop()`

Stop loop.

#### `loop.addEventListener('init', fn)`

Called once, when the loop starts for the first time.

#### `loop.addEventListener('start', fn)`

Called every time the loop starts.
The first start will thus calls `init` and `start`.

#### `loop.addEventListener('stop', fn)`

Called every time the loop stops.

#### `loop.addEventListener('update', fn)`

Called at a constant interval, given by the `fps` parameter.

#### `loop.addEventListener('render', fn)`

Called as fast as `requestAnimationFrame` can go (usually `60` times per second).

#### `loop.dispose()`

Delete instance. Calls `loop.stop()`.

## License

MIT, see [LICENSE.md](https://github.com/vaalentin/game-loop/blob/master/LICENSE.md) for more details.
