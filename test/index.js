import test from 'tape';
import GameLoop from '../src';

test('should be instanciable', t => {
  t.plan(1);

  const loop = new GameLoop();

  t.ok(loop instanceof GameLoop, 'instance of GameLoop');
});

test('should dispatch init when started for the first time', t => {
  t.plan(1);
  t.timeoutAfter(100);

  const loop = new GameLoop();
  loop.on('init', t.pass.bind(t, 'init dispatched'));

  loop.start();
});

test('should dispatch start when started', t => {
  t.plan(2);
  t.timeoutAfter(100);

  const loop = new GameLoop();
  loop.on('start', t.pass.bind(t, 'start dispatched'));

  loop.start();
  loop.stop();
  loop.start();
});

test('should dispatch stop when stopped', t => {
  t.plan(2);
  t.timeoutAfter(100);

  const loop = new GameLoop();
  loop.on('stop', t.pass.bind(t, 'stop dispatched'));

  loop.start();
  loop.stop();
  loop.start();
  loop.stop();
});

test('should dispatch update with the given fps', t => {
  const fps = [10, 20, 30, 60];

  t.plan(fps.length);
  t.timeoutAfter(2000);

  fps.forEach(fps => {
    const errMargin = Math.ceil(fps / 10); // 10% error margin

    let it = 0;

    const loop = new GameLoop(fps);
    loop.on('update', () => it++);

    setTimeout(() => {
      t.ok(
        it >= fps - errMargin && it <= fps + errMargin,
        `${it} iterations with ${fps}fps`
      );
    }, 1000);

    loop.start();
  });
});

test('render should\'nt be affected by the given fps', t => {
  const fps = [10, 20, 30, 60];

  t.plan(fps.length);
  t.timeoutAfter(2000);

  fps.forEach(fps => {
    let loopIt = 0;
    let tickIt = 0;
    
    const loop = new GameLoop(fps);
    loop.on('render', () => loopIt++);

    (function tick() {
      tickIt++;
      requestAnimationFrame(tick);
    })();

    loop.start();

    setTimeout(() => {
      t.equal(loopIt, tickIt, `${loopIt} iterations`);
    }, 1000);
  });
});

test('stop and dispose should stop loop', t => {
  t.plan(1);

  let isStopped = false;

  const loop = new GameLoop();

  loop.on('update', () => {
    if(isStopped) {
      t.fail('loop is still running');
    }
  });

  loop.on('stop', () => isStopped = true);

  loop.start();
  loop.stop();

  setTimeout(() => {
    t.pass('loop was stopped');  
  }, 1000);
});

test.onFinish(window.close.bind(window));
