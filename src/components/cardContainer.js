import Renderer from "../renderer";
import {getCardContainer} from "./templates/card-container";

export class CardContainer extends Renderer {
  constructor(date) {
    super({
      wrapper: `trip-events`,
      renderList: [{
        name: `cardContainer`,
        markup: getCardContainer(date),
      }],
    });
  }
}
