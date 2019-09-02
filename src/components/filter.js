import Renderer from "../renderer";
import {getFilter} from "./templates/filter";

export class Filter extends Renderer {
  constructor(filters) {
    super({
      wrapper: `trip-controls`,
      options: {
        after: `h2:last-of-type`,
      },
      renderList: [{
        name: `filter`,
        markup: getFilter(filters),
      }],
    });
  }
}
