import Renderer from "../renderer";
import {getInfo} from "./templates/info";

export class Info extends Renderer {
  constructor({cities, dates}) {
    super({
      wrapper: `trip-info`,
      options: {
        before: `.trip-info__cost`
      },
      renderList: [{
        name: `info`,
        markup: getInfo(cities, dates),
      }],
    });
  }
}
