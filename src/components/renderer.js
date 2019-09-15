import {createElement} from "./utils/utils";

export default class Renderer {
  constructor({renderList, wrapper, options = {}}) {
    if (new.target === Renderer) {
      throw new Error(`Can't instantiate Renderer, only concrete one.`);
    }
    this.renderedElements = {};
    this.wrapper = null;
    this.options = {
      after: options.after,
      before: options.before,
    };
    this._renderList = renderList;
    this._wrapper = wrapper;
  }
  render() {
    this._createElements({list: this._renderList, wrapperElement: this._getWrapper()});
  }
  update() {
    Object.keys(this.renderedElements).forEach((key) => {
      this.removeElement(key);
    });
    this.render();
  }
  _getWrapper() {
    this.wrapper = document.querySelector(`.${this._wrapper}`);
    return this.wrapper;
  }
  _createElements({list, wrapperElement}) {
    list.forEach((elementOptions) => {
      this._componentRendering(wrapperElement, elementOptions);
    });
  }
  _componentRendering(wrapperElement, elementOptions) {
    const {markup, name} = elementOptions;
    const element = createElement(markup);
    this._appendTemplate(wrapperElement, element);
    this.renderedElements[name] = element;
  }
  _appendTemplate(container, element) {
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
  }
  addElement(name, element) {
    this.wrapper.appendChild(element);
    this.renderedElements[name] = element;
  }
  removeElement(name) {
    this.renderedElements[name].remove();
    delete this.renderedElements[name];
  }
}
