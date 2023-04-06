import { buildComponentFromSchema } from "./helpers.mjs";

/**
 *
 * @constructor
 */
export function Controller() {
  // As it is a constructor, Controller itself cannot be async, Async functions needed for a view should be wrapped into methods (like the setView method below).
  this.view = null;
  this.schema = null;

  /**
   * Called by router. In most cases, should not be overridden.
   * @returns {Promise<void>}
   */
  this.setView = async function () {
    if (!this.schema) throw new Error("Blueprint is not set");
    this.view = buildComponentFromSchema(this.schema);

    if (!this.view) throw new Error("View is not set");
    document.body.append(this.view.getElement());

    document.title = this.schema.title;
  };

  this.swapComponent = function (id, newComponent) {
    let { parentComponent, key, foundComponent } =
      this.view.findComponentDataById(id);

    if (foundComponent !== null) {
      foundComponent.getElement().replaceWith(newComponent.getElement());
    }

    if (parentComponent) parentComponent.subComponents[key] = newComponent;
    else {
      console.warn("Replacing root component");
      this.view.removeElement();
      this.view = newComponent;
    }
  };

  this.updateComponentOption = function (id, optionKey, optionValue) {
    let { foundComponent } = this.view.findComponentDataById(id);
    foundComponent.options[optionKey] = optionValue;
    foundComponent.updateElement();
  };
}
