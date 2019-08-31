import Renderer from "../renderer";
import {cardContainer} from "./templates/card-container";

export class CardContainer extends Renderer {
  constructor() {
    super({
      wrapper: `trip-events`,
      renderList: [{
        name: `cardContainer`,
        markup: cardContainer,
      }],
    });
  }
}
