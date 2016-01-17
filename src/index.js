import EventDispatcher from '@vaalentin/event-dispatcher';

/**
 * @class GameLoop
 */
export default class GameLoop extends EventDispatcher {
  /**
   * @constructs GameLoop
   * @param {float} [fps = 60]
   * @param {float} [speed = 1]
   */
  constructor(fps = 60, speed = 1) {
    super();

    this._isFirstStart = true;

    this._timeStep = (1000 / fps) * speed;
    this._prevTime = null;
    this._lagTime = 0;

    this._frame = this.frame.bind(this);
    this._frameId = null;
  }

  /**
   * @method getTime
   * @private
   * @returns {float}
   */
  getTime() {
    return performance && performance.now
      ? performance.now()
      : Date.now();
  }

  /**
   * @method frame
   * @private
   */
  frame() {
    const curTime = this.getTime();
    const dt = Math.min(1000, curTime - this._prevTime);
    this._prevTime = curTime;
    this._lagTime += dt;

    while(this._lagTime > this._timeStep) {
      this._lagTime -= this._timeStep;
      this.dispatchEvent('update', this._timeStep);
    }

    this.dispatchEvent('render', dt);

    this._frameId = requestAnimationFrame(this._frame);
  }

  /**
   * @method start
   * @public
   */
  start() {
    if(this._isFirstStart) {
      this.dispatchEvent('init');
      this._isFirstStart = false;
    }

    this.dispatchEvent('start');
    this._prevTime = this.getTime();

    this.frame();
  }

  /**
   * @method stop
   * @public
   */
  stop() {
    this.dispatchEvent('stop');
    cancelRequestAnimationFrame(this._frameId);
    this._frameId = null;
  }

  /**
   * @method dispose
   * @public
   */
  dispose() {
    this.stop();
    super.dispose();
  }
}

