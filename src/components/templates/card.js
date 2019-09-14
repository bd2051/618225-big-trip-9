import moment from "moment";
import {TYPES_MAP} from "../utils/constants";
import {setDataDiff} from "../utils/utils";

export const getCard = ({
  type,
  city,
  datetime,
  price,
  addition
}) => {
  const start = moment(datetime.start);
  const end = moment(datetime.end);
  return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${TYPES_MAP[type].setTitle(city)}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${start.format(`YYYY-MM-DDTHH:mm`)}">${start.format(`HH : mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${end.format(`YYYY-MM-DDTHH:mm`)}">${end.format(`HH : mm`)}</time>
        </p>
        <p class="event__duration">${setDataDiff(start, end)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${Array.from(addition.keys()).filter((el) => addition.get(el)).map((el) => `<li class="event__offer">
          <span class="event__offer-title">
            ${el.name}
          </span>&plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${el.price}</span>
        </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
