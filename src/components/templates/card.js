import moment from "moment";

const typesMap = {
  'bus': {
    setTitle: (city) => `Bus to ${city}`,
  },
  'check-in': {
    setTitle: () => `Check into hotel`,
  },
  'drive': {
    setTitle: (city) => `Drive to ${city}`
  },
  'flight': {
    setTitle: (city) => `Flight to ${city}`
  },
  'restaurant': {
    setTitle: () => `Restaurant`
  },
  'ship': {
    setTitle: (city) => `Ship to ${city}`
  },
  'sightseeing': {
    setTitle: (city) => `Sightseeing in ${city}`
  },
  'taxi': {
    setTitle: (city) => `Taxi to ${city}`
  },
  'train': {
    setTitle: (city) => `Train to ${city}`
  },
  'transport': {
    setTitle: (city) => `Transport to ${city}`
  },
  'trip': {
    setTitle: (city) => `Trip to ${city}`
  },
};

const setDataDiff = (start, end) => {
  const TIME_CONVERT = {
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
  };
  const diff = end.diff(start);
  const periods = [
    {
      time: Math.floor(diff / TIME_CONVERT.day),
      suffix: `D`
    },
    {
      time: Math.floor(diff / TIME_CONVERT.hour) - Math.floor(diff / TIME_CONVERT.day) * 24,
      suffix: `H`
    },
    {
      time: Math.floor(diff / TIME_CONVERT.minute) - Math.floor(diff / TIME_CONVERT.hour) * 60,
      suffix: `M`
    },
  ];
  return periods
    .filter((el) => el.time > 0)
    .map((el) => `${el.time}${el.suffix}`)
    .join(` `);
};

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
      <h3 class="event__title">${typesMap[type].setTitle(city)}</h3>

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
        ${addition.map((el) => `<li class="event__offer">
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
