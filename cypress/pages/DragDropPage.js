import BasePage from "./BasePage";
import DragDropLocators from "./locators/DragDropLocators";

class DragDropPage extends BasePage {
  goTo() {
    return this.visit("/drag_and_drop");
  }

  dragColumnAToB() {
    return this.dragAndDrop(DragDropLocators.columnA, DragDropLocators.columnB);
  }

  verifyColumnOrder(expectedAText, expectedBText) {
    cy.get(DragDropLocators.columnA).should("contain.text", expectedAText);
    cy.get(DragDropLocators.columnB).should("contain.text", expectedBText);
    return this;
  }
}

export default new DragDropPage();