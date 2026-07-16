import DragDropPage from "../../pages/DragDropPage";

describe("Drag and Drop UI Tests", () => {

  it("Positive - Drag column A onto column B swaps their positions", () => {
    DragDropPage.goTo();
    DragDropPage.dragColumnAToB();
    DragDropPage.verifyColumnOrder("B", "A");
  });

});