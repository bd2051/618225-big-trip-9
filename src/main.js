import {Info} from "./components/info";
import {Controls} from "./components/controls";
import {Filter} from "./components/filter";
import {CardContainer} from "./components/cardContainer";
import {Cards} from "./components/cards";
import {getFilterData, getMenuData, getTravel} from "./data";

const travels = new Array(12).fill(``).map(getTravel).sort((a, b) => a.datetime.start - b.datetime.start);

const info = new Info({
  cities: travels.map((el) => el.city),
  dates: {
    start: travels[0].datetime.start,
    end: travels[travels.length - 1].datetime.end,
  }
});
const controls = new Controls(getMenuData());
const filter = new Filter(getFilterData());
const cardContainer = new CardContainer(travels[0].datetime.start);
const cards = new Cards(travels);

const rendererList = [
  info,
  controls,
  filter,
  cardContainer,
  cards,
];

rendererList.forEach((el) => el.render());

Object.keys(cards.openingButtons).forEach((key) => {
  cards.openingButtons[key].addEventListener(`click`, () => {
    cards.openDetail(key);
  });
});
Object.keys(cards.closingButtons).forEach((key) => {
  cards.closingButtons[key].addEventListener(`click`, () => {
    cards.closeDetail(key);
  });
});
Object.keys(cards.savingForms).forEach((key) => {
  cards.savingForms[key].addEventListener(`submit`, (e) => {
    e.preventDefault();
  });
});
