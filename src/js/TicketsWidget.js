import {allTicketsFromServer} from "./serverApi";
import TicketWidget from "./TicketWidget";

export default class TicketsWidget {
  constructor(ownerElement) {
    this.element = this.createElement(ownerElement);
    this.ticketWidgets = [];
    this.loadTickets()
  }

  createElement(ownerElement) {
    const element = document.createElement("div");
    element.classList.add("tickets");
    ownerElement.appendChild(element);
    return element;
  }

  loadTickets() {
    const ticketsWidget = this;
    allTicketsFromServer().then(ticketDtoArray => {
      ticketDtoArray.forEach(dto => {
        const ticketWidget = new TicketWidget(ticketsWidget.element, dto);
        ticketsWidget.ticketWidgets.push(ticketWidget);
      });
    });
  }
}
