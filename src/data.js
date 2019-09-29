import {CITIES} from "./components/utils/constants";

let index = 0;

export const getTravel = () => ({
  id: `travel${index++}`,
  type: [
    `bus`,
    `check-in`,
    `drive`,
    `flight`,
    `restaurant`,
    `ship`,
    `sightseeing`,
    `taxi`,
    `train`,
    `transport`,
    `trip`,
  ][Math.floor(Math.random() * 11)],
  city: CITIES[Math.floor(Math.random() * 6)],
  photos: new Array(Math.ceil(Math.random() * 6)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
  description: new Array(Math.ceil(Math.random() * 3)).fill(``).map(() => [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`
  ][Math.floor(Math.random() * 4)]),
  datetime: {
    start: Date.now() + 1 + Math.floor(Math.random() * 7 * 24 * 60 * 60) * 1000,
    end: Date.now() + 1 + Math.floor(Math.random() * 7 * 24 * 60 * 60) * 1000,
  },
  price: Math.round(Math.random() * 1000),
  addition: {
    luggage: {
      id: `luggage`,
      name: `Add luggage`,
      price: 10,
      isSelect: Boolean(Math.round(Math.random()))
    },
    comfort: {
      id: `comfort`,
      name: `Switch to comfort class`,
      price: 150,
      isSelect: Boolean(Math.round(Math.random()))
    },
    meal: {
      id: `meal`,
      name: `Add meal`,
      price: 2,
      isSelect: Boolean(Math.round(Math.random()))
    },
    seats: {
      id: `seats`,
      name: `Choose seats`,
      price: 9,
      isSelect: Boolean(Math.round(Math.random()))
    },
    train: {
      id: `train`,
      name: `Travel by train`,
      price: 40,
      isSelect: Boolean(Math.round(Math.random()))
    },
  },
  isFavorite: Boolean(Math.round(Math.random())),
});

export const getMenuData = () => new Map([
  [`Timeline`, {active: true}],
  [`Table`, {}],
  [`Stats`, {}],
]);

export const getFilterData = () => [
  `everything`,
  `future`,
  `past`,
];
