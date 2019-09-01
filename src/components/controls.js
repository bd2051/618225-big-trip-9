import Renderer from "../renderer";
import {getMenu} from "./templates/menu";

export class Controls extends Renderer {
  constructor(menuItems) {
    super({
      wrapper: `trip-controls`,
      options: {
        after: `h2:first-of-type`,
      },
      renderList: [{
        name: `menu`,
        markup: getMenu(menuItems),
      }],
    });
  }
}
