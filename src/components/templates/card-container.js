import moment from "moment";

export const getCardContainer = (date) => {
  const currentDate = moment(date);
  return `<ul class="trip-days">
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${currentDate.format(`YYYY-MM-DD`)}">${currentDate.format(`MMM`)} ${currentDate.format(`D`)}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>
  </ul>`;
};
