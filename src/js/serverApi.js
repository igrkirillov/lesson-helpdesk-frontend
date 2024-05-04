
const baseUrl = "http://localhost:7070";
export async function allTicketsFromServer() {
  const url = makeUrl({
    method: "allTickets"
  });
  return fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(response => response.json());
}

export async function saveTicketOnServer() {

}

function makeUrl(queryParams) {
  const queryParamsMap = new Map(Object.entries(queryParams || {}));
  let url = baseUrl;
  if (queryParamsMap.size > 0) {
    url += "?";
  }
  let index = 0;
  for (const entry of queryParamsMap.entries()) {
    if (index !== 0) {
      url += "&";
    }
    url += entry[0] + "=" + entry[1];
    ++index;
  }
  return url;
}
