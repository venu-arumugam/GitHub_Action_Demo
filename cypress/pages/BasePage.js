class BasePage {
  visit(path) {
    cy.visit(path);
    return this;
  }

  type(locator, text) {
    cy.get(locator).clear().type(text);
    return this;
  }

  click(locator) {
    cy.get(locator).click();
    return this;
  }

  check(locator) {
    cy.get(locator).check();
    return this;
  }

  uncheck(locator) {
    cy.get(locator).uncheck();
    return this;
  }

  select(locator, value) {
    cy.get(locator).select(value);
    return this;
  }

  dragAndDrop(sourceLocator, targetLocator) {
    const dataTransfer = new DataTransfer();

    cy.get(sourceLocator).trigger("dragstart", { dataTransfer });
    cy.get(targetLocator).trigger("drop", { dataTransfer });
    cy.get(sourceLocator).trigger("dragend");
    return this;
  }

  shouldBeVisible(locator) {
    cy.get(locator).should("be.visible");
    return this;
  }

  shouldContainText(locator, text) {
    cy.get(locator).should("contain.text", text);
    return this;
  }

  shouldHaveValue(locator, value) {
    cy.get(locator).should("have.value", value);
    return this;
  }
}

export default BasePage;