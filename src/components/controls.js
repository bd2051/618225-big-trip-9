import Renderer from "../renderer";
import {menu} from "./templates/menu";

export class Controls extends Renderer {
  constructor() {
    super({
      wrapper: `trip-controls`,
      options: {
        after: `h2:first-of-type`,
      },
      renderList: [{
        name: `menu`,
        markup: menu,
      }],
    });
  }
}
