import Renderer from "./renderer";
import {getCard} from "./templates/card";
import {getEditCard} from "./templates/edit-card";
import {createElement} from "./utils/utils";
import {EventController} from "./controllers/event-controller";
import moment from "moment";

import flatpickr from "flatpickr";

const updateCardEvent = new Event(`update-card`);
const changeCardsEvent = new Event(`change-cards`);
const getDeleteCardEvent = (travelKey) => new CustomEvent(`delete-card`, {detail: {travelKey}});

class Card {
  constructor(travel, wrapper, element) {
    this._travel = travel;
    this._wrapper = wrapper;
    this.element = element;
    this.editingForm = createElement(getEditCard(travel));
    this._setFlatpickr();
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
          this._setFlatpickr();
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
          Object.keys(travelData).forEach((key) => {
            this[key] = travelData[key];
          });
          this.isOpen = false;
        }
      },
      {
        element: () => this.deleteButton,
        type: `click`,
        handler: () => {
          this.isOpen = false;
          this._wrapper.dispatchEvent(getDeleteCardEvent(this.id));
        },
      }
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
  get deleteButton() {
    return this.editingForm.querySelector(`.event__reset-btn`);
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
  _setFlatpickr() {
    const startInput = this.editingForm.querySelector(`#event-start-time-1`);
    const endInput = this.editingForm.querySelector(`#event-end-time-1`);
    flatpickr(startInput, {
      dateFormat: `d/m/y H:i`,
      enableTime: true,
      closeOnSelect: true,
    });
    flatpickr(endInput, {
      dateFormat: `d/m/y H:i`,
      enableTime: true,
      closeOnSelect: true,
    });
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
    return this._travelsData.reduce((acc, travel) => {
      acc[travel.id] = travel;
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
      },
      {
        element: this.wrapper,
        type: `delete-card`,
        handler: (e) => {
          this.removeElement(e.detail.travelKey);
        }
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
  addElement(travelData) {
    const [travel] = Cards._getRenderList([travelData]);
    super.addElement(travel.name, createElement(travel.markup));
    this._travels[travel.name] = new Card(travelData, this.wrapper, this.renderedElements[travel.name]);
  }
  static _getRenderList(travelsData) {
    return travelsData.map((travel) => ({
      name: travel.id,
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
      this.wrapper.dispatchEvent(changeCardsEvent);
    });
  }
  _updateTravels() {
    this._travels = this._computeTravels(this._travels);
    this._totalCostElement.innerText = this.calculateTravelsCost();
  }
  _computeTravels(travels) {
    const tempTravels = travels || {};
    const travelMap = this._travelsDataMap;
    return this._travelsData
      .reduce((acc, curr) => {
        if (!this.renderedElements[curr.id]) {
          delete acc[curr.id];
          return acc;
        }
        if (this.renderedElements[curr.id] && !tempTravels[curr.id]) {
          acc[curr.id] = new Card(travelMap[curr.id], this.wrapper, this.renderedElements[curr.id]);
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
