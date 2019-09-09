import Renderer from "../renderer";
import {getCard} from "./templates/card";
import {getEditCard} from "./templates/edit-card";

export class Cards extends Renderer {
  constructor(travels) {
    super({
      wrapper: `trip-events__list`,
      renderList: travels.map((travel, index) => ({
        name: index,
        markup: getCard(travel),
      })),
    });
    this._travels = travels;
    this.totalCostElement = document.querySelector(`.trip-info__cost-value`);
    this.totalCostElement.innerText = this.calculateTravelsCost();
    this.detailCards = this._renderList.reduce((acc, key, index) => {
      const detailCards = document.createElement(`div`);
      detailCards.innerHTML = getEditCard(this._travels[index]);
      acc[key.name] = detailCards;
      return acc;
    }, {});
  }
  get travels() {
    return this._travels;
  }
  set travels(value) {
    this._travels = value;
    this.totalCostElement.innerText = this.calculateTravelsCost();
  }
  get openingButtons() {
    return Object.keys(this.renderedElements).reduce((acc, key) => {
      acc[key] = this.renderedElements[key].querySelector(`.event__rollup-btn`);
      return acc;
    }, {});
  }
  get closingButtons() {
    return Object.keys(this.detailCards).reduce((acc, key) => {
      acc[key] = this.detailCards[key].querySelector(`.event__rollup-btn`);
      return acc;
    }, {});
  }
  get savingForms() {
    return Object.keys(this.detailCards).reduce((acc, key) => {
      acc[key] = this.detailCards[key].querySelector(`form.event.event--edit`);
      return acc;
    }, {});
  }
  calculateTravelsCost() {
    return this._travels.reduce((acc, curr) => {
      acc += curr.price;
      acc += Array.from(curr.addition.keys()).reduce((additionAcc, additionCurr) => {
        additionAcc += additionCurr.price;
        return additionAcc;
      }, 0);
      return acc;
    }, 0);
  }
  openDetail(name) {
    this.wrapper.replaceChild(this.detailCards[name], this.renderedElements[name]);
  }
  closeDetail(name) {
    this.wrapper.replaceChild(this.renderedElements[name], this.detailCards[name]);
  }
}
