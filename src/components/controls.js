import Renderer from "./renderer";
import {getMenu} from "./templates/menu";
import {EventController} from './controllers/event-controller';

const getChangeTabEvent = (tab) => new CustomEvent(`change-tab`, {detail: {tab}});

export class Controls extends Renderer {
  constructor(menuItems) {
    super({
      wrapper: `trip-controls`,
      options: {
        after: `h2:first-of-type`,
      },
      renderList: [{
        name: `menu`,
        markup: getMenu(menuItems),
      }],
    });
    this._init();
  }
  render() {
    super.render();
    this._eventController = new EventController([
      {
        element: this.renderedElements.menu.querySelector(`.trip-tabs__btn[data-item="timeline"]`),
        type: `click`,
        handler: () => this.wrapper.dispatchEvent(getChangeTabEvent(`timeline`)),
      },
      {
        element: this.renderedElements.menu.querySelector(`.trip-tabs__btn[data-item="table"]`),
        type: `click`,
        handler: () => this.wrapper.dispatchEvent(getChangeTabEvent(`table`)),
      },
      {
        element: this.renderedElements.menu.querySelector(`.trip-tabs__btn[data-item="stats"]`),
        type: `click`,
        handler: () => this.wrapper.dispatchEvent(getChangeTabEvent(`stats`)),
      },
    ]);
    this._eventController.add();
  }
  _init() {
    this._eventController = null;
  }
}
