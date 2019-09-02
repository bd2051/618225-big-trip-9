import moment from "moment";

export const getInfo = (cities, dates) => {
  const way = cities.filter((el, i, arr) => el !== arr[i - 1]);
  const start = moment(dates.start);
  const end = moment(dates.end);
  const startMonth = start.format(`MMM`);
  const endMonth = startMonth !== end.format(`MMM`) ? `${end.format(`MMM`)} ` : ``;
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${way.length > 3 ? `${way[0]} - ... - ${way[way.length - 1]}` : way.join(` - `)}</h1>

    <p class="trip-info__dates">
      ${startMonth} ${start.format(`D`)}&nbsp;&mdash;&nbsp;${endMonth}${end.format(`D`)}
    </p>
  </div>`;
};
