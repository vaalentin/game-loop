# Game loop

[![Build Status](https://travis-ci.org/vaalentin/game-loop.svg?branch=master)](https://travis-ci.org/vaalentin/game-loop)

Simple game loop.

## Installation

```
$ npm install --save @vaalentin/game-loop
```

## Usage

```js
import GameLoop from '@vaalentin/game-loop';

const loop = new GameLoop(30);

loop.on('init', () => {
  // called once
});

loop.on('update', dt => {
  // called 30 times per second
});

loop.on('render', dt => {
  // called as fast as possible, usually 60 times a sec
});
```

## API

GameLoop inherits from [EventDispatcher](https://github.com/vaalentin/event-dispatcher#api).

#### `loop = new GameLoop(fps, speed)`

Where `fps` is a number that dictates how many times per second the `update` will be called.
This is used to get a constant timestep (default is 60).
`speed` is a number from (usually from `0` to `2`), to increase/reduce the timestep (default is `1`).

#### `loop.start()`

Start loop.

#### `loop.stop()`

Stop loop.

#### `loop.dispose()`

Delete instance. Calls `loop.stop()`.

### Events

- `init` Called once, when the loop starts for the first time.
- `start` Called every time the loop starts.
- `stop` Called every time the loop stops.
- `update` Called at a constant interval, given by the `fps` parameter.
- `render` Called as fast as `requestAnimationFrame` can go.

## License

MIT, see [LICENSE.md](https://github.com/vaalentin/game-loop/blob/master/LICENSE.md) for more details.
