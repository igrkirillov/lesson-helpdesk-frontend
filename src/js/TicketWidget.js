import {deleteByIdOnServer, ticketByIdFromServer, updateByIdOnServer} from "./serverApi";
import TicketDialogWidget from "./TicketDialogWidget";

export default class TicketWidget {
  constructor(ticketsWidget, ownerElement, dto) {
    this.ticketsWidget = ticketsWidget;
    this.ownerElement = ownerElement;
    this.element = this.createElement(ownerElement, dto);
    this.dto = dto;
    this.addListeners();
  }

  createElement(ownerElement, dto) {
    const element = document.createElement("div");
    element.classList.add("ticket");
    element.dataset.id = dto.id;
    element.innerHTML = `
        <div class="ticket-row">
          <label>
            <input type="checkbox" value="${dto.status}" class="ticket-status visually-hidden"/>
            <div class="ticket-status-switch"></div>
          </label>
          <span class="ticket-name">
            ${dto.name}
          </span>
          <span class="ticket-datetime">
            ${dto.created.toLocaleString()}
          </span>
          <div class="ticket-toolbar">
            <a href="#" class="ticket-toolbar-element ticket-edit">&#128393;</a>
            <a href="#" class="ticket-toolbar-element ticket-remove">&#x2573;</a>
          </div>
      </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  onClickEdit() {
    new TicketDialogWidget(this.ticketsWidget, this.ownerElement, this.dto);
  }

  onClickRemove() {
    const widget = this;
    deleteByIdOnServer(this.dto).then(dto => widget.ticketsWidget.removeTicketWidget(dto));
  }

  getTicketEditElement() {
    return this.element.querySelector(".ticket-edit");
  }

  getTicketRemoveElement() {
    return this.element.querySelector(".ticket-remove");
  }

  getTicketStatusElement() {
    return this.element.querySelector(".ticket-status");
  }

  getTicketNameElement() {
    return this.element.querySelector(".ticket-name");
  }

  getTicketDateTimeElement() {
    return this.element.querySelector(".ticket-datetime");
  }

  addListeners() {
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.getTicketEditElement().addEventListener("click", this.onClickEdit);
    this.getTicketRemoveElement().addEventListener("click", this.onClickRemove);
  }

  remove() {
    this.getTicketEditElement().removeEventListener("click", this.onClickEdit);
    this.getTicketRemoveElement().removeEventListener("click", this.onClickRemove);
    this.ownerElement.removeChild(this.element);
  }

  reload() {
    const widget = this;
    ticketByIdFromServer(this.dto).then(dto => {
      widget.dto = dto;
      widget.refreshFields();
    });
  }

  refreshFields() {
    this.getTicketStatusElement().value = this.dto.status;
    this.getTicketNameElement().textContent = this.dto.name;
    this.getTicketDateTimeElement().textContent = this.dto.created.toLocaleString();
  }
}
