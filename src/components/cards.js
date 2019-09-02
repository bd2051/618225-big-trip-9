import Renderer from "../renderer";
import {getCard} from "./templates/card";

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
  }
  get travels() {
    return this._travels;
  }
  set travels(value) {
    this._travels = value;
    this.totalCostElement.innerText = this.calculateTravelsCost();
  }
  calculateTravelsCost() {
    return this._travels.reduce((acc, curr) => {
      acc += curr.price;
      acc += curr.addition.reduce((additionAcc, additionCurr) => {
        additionAcc += additionCurr.price;
        return additionAcc;
      }, 0);
      return acc;
    }, 0);
  }
}
