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
  }
}
