import {Controls} from "../controls";
import {getFilterData, getMenuData, getTravel} from "../../data";
import {Filter} from "../filter";
import {CardContainer} from "../cardContainer";
import {Cards} from "../cards";
import {Info} from "../info";
import {EventController} from "./event-controller";
import {Stats} from '../stats';

export class TravelController {
  constructor({travels}) {
    this._travels = travels;
    this._info = new Info({
      cities: travels.map((el) => el.city),
      dates: {
        start: travels[0] ? travels[0].datetime.start : null,
        end: travels[travels.length - 1] ? travels[travels.length - 1].datetime.end : null,
      }
    });
    this._controls = new Controls(getMenuData());
    this._filter = new Filter(getFilterData());
    this._stats = new Stats({});
    this._cardContainer = new CardContainer(travels[0] ? travels[0].datetime.start : null);
    this._cards = new Cards(travels);
    this._eventController = null;
  }
  init() {
    [
      this._info,
      this._controls,
      this._filter,
      this._stats,
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
          this.updateTravels();
          if (Object.keys(this._cards.travels).length === 0) {
            this._cardContainer.showNoCards();
          } else {
            this._cardContainer.hideNoCards();
          }
        }
      },
      {
        element: this._cardContainer.wrapper,
        type: `sort-cards`,
        handler: (e) => {
          this._cards.update(e.detail.sort(this._travels));
        }
      },
      {
        element: this._controls.wrapper,
        type: `change-tab`,
        handler: (e) => {
          const tab = e.detail.tab;
          if (tab === `stats`) {
            this._stats.show();
            this._cardContainer.hide();
          } else if (tab === `timeline`) {
            this._stats.hide();
            this._cardContainer.show();
          }
        }
      },
      {
        element: document.querySelector(`.trip-main__event-add-btn`),
        type: `click`,
        handler: () => {
          this._cards.addElement(getTravel());
        }
      },
    ]);
    this._eventController.add();
  }
  updateTravels() {
    this._travels = Object.values(this._cards.travels).map((el) => {
      return Object.keys(getTravel()).reduce((acc, key) => {
        acc[key] = el[key];
        return acc;
      }, {});
    });
  }
}
