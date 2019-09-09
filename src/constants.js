import {Type} from "./utils";

export const TYPES_MAP = {
  'bus': new Type(`bus`, `to`),
  'check-in': new Type(`check-in`, `into`, `Check into hotel`),
  'drive': new Type(`drive`, `to`),
  'flight': new Type(`flight`, `to`),
  'restaurant': new Type(`restaurant`, ``, `Restaurant`),
  'ship': new Type(`ship`, `to`),
  'sightseeing': new Type(`sightseeing`, `in`),
  'taxi': new Type(`taxi`, `to`),
  'train': new Type(`train`, `to`),
  'transport': new Type(`transport`, `to`),
  'trip': new Type(`trip`, `to`),
};

export const CITIES = [
  `Tokio`,
  `Peking`,
  `New-York`,
  `London`,
  `Paris`,
  `Saint-Petersburg`,
];
