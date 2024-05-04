export default class TicketDialogWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("ticket-dialog");
    element.innerHTML = `
    <div class="ticket-dialog-title">
        <span>Добавить тикет</span>
    </div>
    <div class="ticket-dialog-container">
        <label for="name">Краткое описание</label>>
        <input class="ticket-dialog-name" type="text" name="name">
        <label for="description">Подробное описание</label>>
        <textarea class="ticket-dialog-description" type="text" name="description"/>
        <div class="ticket-dialog-buttons">
            <input class="ticket-dialog-cancel" type="submit" value="Отмена">
            <input class="ticket-dialog-ok" type="submit" value="Ок">
        </div>
    </div>`;
    ownerElement.appendChild(element);
    return element;
  }
}
