export class EventController {
  constructor(events) {
    if (!(events instanceof Array)
      && events.every((el) => {
        return el.hasOwnProperty(`element`)
          && el.hasOwnProperty(`handler`)
          && el.hasOwnProperty(`type`);
      })) {
      throw new Error(`Invalid input parameters`);
    }
    this._events = events;
  }
  add() {
    this._events.forEach((el) => {
      this._getElement(el.element).addEventListener(el.type, el.handler);
    });
  }
  remove() {
    this._events.forEach((el) => {
      this._getElement(el.element).addEventListener(el.type, el.handler);
    });
  }
  _getElement(element) {
    if (element instanceof Node) {
      return element;
    } else if (element instanceof Function) {
      return element();
    }
    throw Error(`Unknown type of element`);
  }
}
