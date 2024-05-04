import {allTicketsFromServer} from "./serverApi";
import TicketWidget from "./TicketWidget";
import TicketDialogWidget from "./TicketDialogWidget";

export default class TicketsWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
    this.ticketWidgets = [];
    this.addListeners();
    this.loadTickets();
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("tickets");
    element.innerHTML = `
    <div class="tickets-toolbar">
        <input type="button" class="tickets-add" value="Добавить тикет">
    </div>
    <div class="tickets-container">
        
    </div>`;
    ownerElement.appendChild(element);
    return element;
  }

  addListeners() {
    const ticketsAddElement = this.element.querySelector(".tickets-add");
    ticketsAddElement.addEventListener("click", this.onClickAddTicket.bind(this));
  }

  onClickAddTicket() {
    const dialog = new TicketDialogWidget(this.element);
  }

  loadTickets() {
    const ticketsWidget = this;
    allTicketsFromServer().then(ticketDtoArray => {
      const ticketsContainerElement = ticketsWidget.element.querySelector(".tickets-container");
      ticketDtoArray.forEach(dto => {
        const ticketWidget = new TicketWidget(ticketsContainerElement, dto);
        ticketsWidget.ticketWidgets.push(ticketWidget);
      });
    });
  }
}
