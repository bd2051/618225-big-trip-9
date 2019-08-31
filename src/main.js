import {Info} from "./components/info";
import {Controls} from "./components/controls";
import {Filter} from "./components/filter";
import {CardContainer} from "./components/cardContainer";
import {Cards} from "./components/cards";
import {getTravel} from "./data";

const travels = new Array(12).fill(``).map(getTravel)

const rendererList = [
  new Info(),
  new Controls(),
  new Filter(),
  new CardContainer(),
  new Cards(travels),
];

rendererList.forEach((el) => el.render());
