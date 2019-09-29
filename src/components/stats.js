import Renderer from './renderer';
import {getStats} from './templates/stats';


export class Stats extends Renderer {
  constructor() {
    super({
      wrapper: `page-body__container:not(.page-header__container)`,
      options: {
        after: `.trip-events`,
      },
      renderList: [{
        name: `stat`,
        markup: getStats({}),
      }],
    });
  }
  render() {
    super.render();
    this.hide();
  }
  show() {
    this.renderedElements.stat.classList.remove(`visually-hidden`);
  }
  hide() {
    this.renderedElements.stat.classList.add(`visually-hidden`);
  }
}
