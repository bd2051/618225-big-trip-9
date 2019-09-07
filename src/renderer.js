export default class Renderer {
  constructor({renderList, wrapper, options = {}}) {
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
    const {markup, count = 1, classes = [], name} = elementOptions;
    const tempCount = classes.length || count;
    for (let i = 0; i < tempCount; i++) {
      const element = document.createElement(`div`);
      if (classes[i]) {
        element.classList.add(classes[i]);
      }
      element.innerHTML = `${markup}`;
      this._appendTemplate(wrapperElement, element);
      this.renderedElements[name] = element;
    }
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
  removeElement(name) {
    this.renderedElements[name].remove();
    delete this.renderedElements[name];
  }
}
