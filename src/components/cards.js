import Renderer from "./renderer";
import {getCard} from "./templates/card";
import {getEditCard} from "./templates/edit-card";
import {createElement} from "./utils/utils";
import {EventController} from "./controllers/event-controller";
import moment from "moment";

const getTravelKey = (i) => `travel${i}`;
const updateCardEvent = new Event(`update-card`);
const changeCards = new Event(`change-cards`);

class Card {
  constructor(travel, wrapper, element) {
    this._travel = travel;
    this._wrapper = wrapper;
    this.element = element;
    this.editingForm = createElement(getEditCard(travel));
    this._isOpen = false;
    Object.keys(travel).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          return this._travel[key];
        },
        set: (val) => {
          this._travel[key] = val;
          this._eventController.remove();
          this._replaceElement();
          this._replaceEditForm();
          this._eventController.add();
          this._wrapper.dispatchEvent(updateCardEvent);
        }
      });
    });
    this._eventController = new EventController([
      {
        element: () => this.openingButton,
        type: `click`,
        handler: () => {
          this.isOpen = true;
        }
      },
      {
        element: () => this.closingButton,
        type: `click`,
        handler: () => {
          this.isOpen = false;
        }
      },
      {
        element: () => this.savingForm,
        type: `submit`,
        handler: (e) => {
          e.preventDefault();
          const formData = new FormData(this.editingForm.querySelector(`form`));
          const addition = formData.getAll(`event-offer`);
          const travelData = {
            type: formData.getAll(`event-type`)[0],
            city: formData.get(`event-destination`),
            datetime: {
              start: moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
              end: moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
            },
            price: formData.get(`event-price`),
            addition: Object.keys(this.addition).reduce((acc, key) => {
              acc[key] = this.addition[key];
              acc[key].isSelect = addition.includes(key);
              return acc;
            }, {}),
            isFavorite: Boolean(formData.get(`event-favorite`)),
          };
          const exceptions = [
            `description`,
            `photos`,
          ];
          if (Object.keys(this._travel).some((key) => travelData[key] === undefined && !exceptions.includes(key))) {
            throw new Error(`Form don't submit key ${Object.keys(this._travel).filter((key) => travelData[key] === undefined && !exceptions.includes(key)).join(`, `)}`);
          }
          this.isOpen = false;
        }
      },
    ]);
    this._eventController.add();
  }
  get openingButton() {
    return this.element.querySelector(`.event__rollup-btn`);
  }
  get closingButton() {
    return this.editingForm.querySelector(`.event__rollup-btn`);
  }
  get savingForm() {
    return this.editingForm.querySelector(`form.event.event--edit`);
  }
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(val) {
    this._isOpen = val;
    if (val) {
      this._openTravel();
    } else {
      this._closeTravel();
    }
  }
  _openTravel() {
    this._wrapper.replaceChild(this.editingForm, this.element);
  }
  _closeTravel() {
    this._wrapper.replaceChild(this.element, this.editingForm);
  }
  _replaceElement() {
    const newElement = createElement(getCard(this._travel));
    if (this._wrapper.contains(this.element)) {
      this._wrapper.replaceChild(newElement, this.element);
    }
    this.element = newElement;
  }
  _replaceEditForm() {
    const newEditingForm = createElement(getEditCard(this._travel));
    if (this._wrapper.contains(this.editingForm)) {
      this._wrapper.replaceChild(newEditingForm, this.editingForm);
    }
    this.editingForm = newEditingForm;
  }
}

export class Cards extends Renderer {
  constructor(travelsData) {
    super({
      wrapper: `trip-events__list`,
      renderList: Cards._getRenderList(travelsData)
    });
    this._init(travelsData);
  }
  get _travelsDataMap() {
    return this._travelsData.reduce((acc, travel, index) => {
      acc[getTravelKey(index)] = travel;
      return acc;
    }, {});
  }
  get travels() {
    return this._travels;
  }
  get openedCards() {
    return Object.values(this.travels).filter((el) => el.isOpen);
  }
  render() {
    super.render();
    this._observer.observe(this.wrapper, {childList: true});
    this._updateTravels();
    this._eventController = new EventController([
      {
        element: this.wrapper,
        type: `update-card`,
        handler: () => this._updateTravels()
      }
    ]);
    this._eventController.add();
  }
  update(travelsData) {
    this._eventController.remove();
    this._observer.disconnect();
    this._init(travelsData);
    this._renderList = Cards._getRenderList(travelsData);
    super.update();
  }
  static _getRenderList(travelsData) {
    return travelsData.map((travel, index) => ({
      name: getTravelKey(index),
      markup: getCard(travel),
    }));
  }
  _init(travelsData) {
    this._totalCostElement = document.querySelector(`.trip-info__cost-value`);
    this._travelsData = travelsData;
    this._travels = null;
    this._eventController = null;
    this._observer = new MutationObserver(() => {
      this._updateTravels();
      this.wrapper.dispatchEvent(changeCards);
    });
  }
  _updateTravels() {
    this._travels = this._computeTravels(this._travels);
    this._totalCostElement.innerText = this.calculateTravelsCost();
  }
  _computeTravels(travels) {
    const tempTravels = travels || {};
    const taskMap = this._travelsDataMap;
    return this._travelsData
      .reduce((acc, curr, index) => {
        if (!this.renderedElements[getTravelKey(index)]) {
          delete acc[getTravelKey(index)];
          return acc;
        }
        if (this.renderedElements[getTravelKey(index)] && !tempTravels[getTravelKey(index)]) {
          acc[getTravelKey(index)] = new Card(taskMap[getTravelKey(index)], this.wrapper, this.renderedElements[getTravelKey(index)]);
        }
        return acc;
      }, tempTravels);
  }
  calculateTravelsCost() {
    return Object.values(this.travels).reduce((acc, curr) => {
      acc += parseInt(curr.price, 10);
      acc += Object.values(curr.addition).reduce((additionAcc, additionCurr) => {
        additionAcc += parseInt(additionCurr.price, 10);
        return additionAcc;
      }, 0);
      return acc;
    }, 0);
  }
}
