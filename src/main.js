import {info} from "./components/info";
import {menu} from "./components/menu";
import {filter} from "./components/filter";
import {editCard} from "./components/edit-card";
import {cardContainer} from "./components/card-container";

function Renderer({renderList, wrapper, options = {}}) {
  this.renderedElements = {};
  this.wrapper = null;
  this.options = {
    after: options.after,
    before: options.before,
  };
  this.render = () => this._createElements({wrapperElement: this._getWrapper()});

  this._renderList = renderList;
  this._getWrapper = () => {
    this.wrapper = document.querySelector(`.${wrapper}`);
    return this.wrapper;
  };
  this._createElements = ({wrapperElement}) => {
    this._renderList.forEach((elementOptions) => {
      this._componentRendering(wrapperElement, elementOptions);
    });
  };
  this._componentRendering = (wrapperElement, elementOptions) => {
    const {markup, count = 1, classes = [], name} = elementOptions;
    const tempCount = classes.length || count;
    this.renderedElements[name] = [];
    for (let i = 0; i < tempCount; i++) {
      const element = document.createElement(`div`);
      if (classes[i]) {
        element.classList.add(classes[i]);
      }
      element.innerHTML = `${markup}`;
      this._appendTemplate(wrapperElement, element);
      this.renderedElements[name].push(element);
    }
  };
  this._appendTemplate = (container, element) => {
    let elementBefore;
    if (this.options.after && this.options.before) {
      throw Error(`Renderer has after and before options at the same time`);
    }
    if (this.options.before) {
      elementBefore = container.querySelector(this.options.before);
    } else {
      elementBefore = this.options.after ? container.querySelector(this.options.after).nextSibling : null;
    }
    container.insertBefore(element, elementBefore);
  };
}

const rendererList = [
  new Renderer({
    wrapper: `trip-info`,
    options: {
      before: `.trip-info__cost`
    },
    renderList: [{
      name: `info`,
      markup: info,
    }],
  }),
  new Renderer({
    wrapper: `trip-controls`,
    options: {
      after: `h2:first-of-type`,
    },
    renderList: [{
      name: `menu`,
      markup: menu,
    }],
  }),
  new Renderer({
    wrapper: `trip-controls`,
    options: {
      after: `h2:last-of-type`,
    },
    renderList: [{
      name: `filter`,
      markup: filter,
    }],
  }),
  new Renderer({
    wrapper: `trip-events`,
    renderList: [{
      name: `cardContainer`,
      markup: cardContainer,
    }],
  }),
  new Renderer({
    wrapper: `trip-events__list`,
    renderList: [{
      name: `editCard`,
      markup: editCard,
    }],
  }),
];

rendererList.forEach((el) => el.render());
