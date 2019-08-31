import Renderer from "../renderer";
import {info} from "./templates/info";

export class Info extends Renderer {
  constructor() {
    super({
      wrapper: `trip-info`,
      options: {
        before: `.trip-info__cost`
      },
      renderList: [{
        name: `info`,
        markup: info,
      }],
    });
  }
}
