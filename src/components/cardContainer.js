import Renderer from "../renderer";
import {getCardContainer} from "./templates/card-container";
import {getNoCards} from "./templates/no-cards";

export class CardContainer extends Renderer {
  constructor(date) {
    super({
      wrapper: `trip-events`,
      renderList: [
        {
          name: `noCards`,
          markup: getNoCards()
        },
        {
          name: `cardContainer`,
          markup: getCardContainer(date),
        }
      ],
    });
  }
  get isShowNoCards() {
    return !this.renderedElements[`noCards`].classList.contains(`visually-hidden`);
  }
  render() {
    super.render();
    this.renderedElements[`noCards`].classList.add(`visually-hidden`);
  }
  showNoCards() {
    if (!this.isShowNoCards) {
      this.renderedElements[`noCards`].classList.remove(`visually-hidden`);
      this.renderedElements[`cardContainer`].classList.add(`visually-hidden`);
    }
  }
  hideNoCards() {
    if (this.isShowNoCards) {
      this.renderedElements[`noCards`].classList.add(`visually-hidden`);
      this.renderedElements[`cardContainer`].classList.remove(`visually-hidden`);
    }
  }
}
