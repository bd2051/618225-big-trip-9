import {Info} from "./components/info";
import {Controls} from "./components/controls";
import {Filter} from "./components/filter";
import {CardContainer} from "./components/cardContainer";
import {Cards} from "./components/cards";
import {getFilterData, getMenuData, getTravel} from "./data";

const travels = new Array(12).fill(``).map(getTravel).sort((a, b) => a.datetime.start - b.datetime.start);

const rendererList = [
  new Info({
    cities: travels.map((el) => el.city),
    dates: {
      start: travels[0].datetime.start,
      end: travels[travels.length - 1].datetime.end,
    }
  }),
  new Controls(getMenuData()),
  new Filter(getFilterData()),
  new CardContainer(travels[0].datetime.start),
  new Cards(travels),
];

rendererList.forEach((el) => el.render());
