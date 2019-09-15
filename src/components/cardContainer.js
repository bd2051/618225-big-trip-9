import Renderer from "./renderer";
import {getCardContainer} from "./templates/card-container";
import {getNoCards} from "./templates/no-cards";
import {getSort} from "./templates/sort";
import {EventController} from "./controllers/event-controller";

const getSortCardsEvent = (sort) => new CustomEvent(`sort-cards`, {detail: {sort}});

class Sort {
  constructor(wrapper, element) {
    this._wrapper = wrapper;
    this._element = element;
    this._eventController = new EventController([
      {
        element: this._element.querySelector(`.trip-sort__btn[data-sort="event"]`),
        type: `click`,
        handler: () => this._wrapper.dispatchEvent(getSortCardsEvent(Sort.eventSort)),
      },
      {
        element: this._element.querySelector(`.trip-sort__btn[data-sort="time"]`),
        type: `click`,
        handler: () => {
          this._wrapper.dispatchEvent(getSortCardsEvent(Sort.timeSort));
        },
      },
      {
        element: this._element.querySelector(`.trip-sort__btn[data-sort="price"]`),
        type: `click`,
        handler: () => this._wrapper.dispatchEvent(getSortCardsEvent(Sort.priceSort)),
      },
    ]);
    this._eventController.add();
  }
  get element() {
    return this._element;
  }
  static eventSort(travels) {
    return [...travels];
  }
  static timeSort(travels) {
    return [...travels].sort((a, b) => a.datetime.start - b.datetime.start);
  }
  static priceSort(travels) {
    return [...travels].sort((a, b) => a.price - b.price);
  }
}

export class CardContainer extends Renderer {
  constructor(date) {
    super({
      wrapper: `trip-events`,
      renderList: [
        {
          name: `sort`,
          markup: getSort(),
        },
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
    this.sort = null;
  }
  get isShowNoCards() {
    return !this.renderedElements[`noCards`].classList.contains(`visually-hidden`);
  }
  render() {
    super.render();
    this.renderedElements[`noCards`].classList.add(`visually-hidden`);
    this.sort = new Sort(this.wrapper, this.renderedElements[`sort`]);
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
