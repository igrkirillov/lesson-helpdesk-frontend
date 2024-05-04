export default class TicketWidget {
  constructor(ownerElement, dto) {
    this.element = this.createElement(ownerElement, dto);
    this.dto = dto;
  }

  createElement(ownerElement, dto) {
    const element = document.createElement("div");
    element.classList.add("ticket");
    element.dataset.id = dto.id;
    element.innerHTML = `
        <div class="ticket-row">
          <label>
            <input type="checkbox" checked="${dto.status}" class="ticket-status visually-hidden"/>
            <div class="ticket-status-switch"></div>
          </label>
          <span class="ticket-name">
            ${dto.name}
          </span>
          <span class="ticket-datetime">
            ${new Date(dto.dateTime).toLocaleString()}
          </span>
          <div class="ticket-toolbar">
            <a href="#" class="ticket-toolbar-element ticket-edit">&#128393;</a>
            <a href="#" class="ticket-toolbar-element ticket-remove">&#x2573;</a>
          </div>
      </div>
    `;
    ownerElement.appendChild(element);
    return element;
  }
}
