import {Controls} from "../controls";
import {getFilterData, getMenuData} from "../../data";
import {Filter} from "../filter";
import {CardContainer} from "../cardContainer";
import {Cards} from "../cards";
import {Info} from "../info";
import {EventController} from "./event-controller";

export class TravelController {
  constructor({travels}) {
    this._info = new Info({
      cities: travels.map((el) => el.city),
      dates: {
        start: travels[0].datetime.start,
        end: travels[travels.length - 1].datetime.end,
      }
    });
    this._controls = new Controls(getMenuData());
    this._filter = new Filter(getFilterData());
    this._cardContainer = new CardContainer(travels[0].datetime.start);
    this._cards = new Cards(travels);
    this._eventController = null;
  }
  init() {
    [
      this._info,
      this._controls,
      this._filter,
      this._cardContainer,
      this._cards,
    ].forEach((el) => el.render());
    this._eventController = new EventController([
      {
        element: window,
        type: `keydown`,
        handler: (e) => {
          if (e.key === `Escape`) {
            e.preventDefault();
            this._cards.openedCards.forEach((card) => {
              card.isOpen = false;
            });
          }
        }
      },
      {
        element: this._cards.wrapper,
        type: `change-cards`,
        handler: () => {
          if (Object.keys(this._cards.travels).length === 0) {
            this._cardContainer.showNoCards();
          } else {
            this._cardContainer.hideNoCards();
          }
        }
      }
    ]);
  }
}
