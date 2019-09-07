export const setDataDiff = (start, end) => {
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

export const capitalize = (str) => str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());

export class Type {
  constructor(type, preposition, title) {
    this.label = capitalize(type);
    this._preposition = preposition;
    this._title = title;
  }
  setTitle(city = ``) {
    return this._title || `${this.label} ${this._preposition} ${city}`;
  }
  get hasCity() {
    return !this._title;
  }
}
