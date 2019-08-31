import Renderer from "../renderer";
import {filter} from "./templates/filter";

export class Filter extends Renderer {
  constructor() {
    super({
      wrapper: `trip-controls`,
      options: {
        after: `h2:last-of-type`,
      },
      renderList: [{
        name: `filter`,
        markup: filter,
      }],
    });
  }
}
