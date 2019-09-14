import Renderer from "../renderer";
import {getCard} from "./templates/card";
import {getEditCard} from "./templates/edit-card";
import {createElement} from "../utils";
import {EventController} from "../event-controller";

const getTravelKey = (i) => `travel${i}`;
const updateCardEvent = new Event(`update-card`);

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
      renderList: travelsData.map((travel, index) => ({
        name: getTravelKey(index),
        markup: getCard(travel),
      })),
    });
    this._travelsData = travelsData;
    this._travels = {};
    this._totalCostElement = document.querySelector(`.trip-info__cost-value`);
    this._eventController = null;
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
    return Object.values(this._travels).filter((el) => el.isOpen);
  }
  render() {
    super.render();
    this._travels = this._computeTravels(this._travels);
    this._totalCostElement.innerText = this.calculateTravelsCost();
    this._eventController = new EventController([
      {
        element: this.wrapper,
        type: `update-card`,
        handler: () => {
          this._totalCostElement.innerText = this.calculateTravelsCost();
        }
      }
    ]);
    this._eventController.add();
  }
  _computeTravels(travels) {
    const taskMap = this._travelsDataMap;
    return this._travelsData
      .reduce((acc, curr, index) => {
        if (this.renderedElements[getTravelKey(index)] && !travels[getTravelKey(index)]) {
          acc[getTravelKey(index)] = new Card(taskMap[getTravelKey(index)], this.wrapper, this.renderedElements[getTravelKey(index)]);
        }
        return acc;
      }, travels);
  }
  calculateTravelsCost() {
    return Object.values(this._travels).reduce((acc, curr) => {
      acc += curr.price;
      acc += Array.from(curr.addition.keys()).reduce((additionAcc, additionCurr) => {
        additionAcc += additionCurr.price;
        return additionAcc;
      }, 0);
      return acc;
    }, 0);
  }
}
