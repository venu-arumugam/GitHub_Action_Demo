import Endpoints from "./endpoints";

class BookingService {

  // ---- Auth ----
createToken(username, password) {
  return cy.request({
    method: "POST",
    url: Endpoints.auth,
    body: { username, password }
  }).then((response) => response.body.token);
}

  getAllBookings() {
    return cy.request("GET", Endpoints.booking);
  }

  getBookingById(id, failOnStatusCode = true) {
    return cy.request({
      method: "GET",
      url: Endpoints.bookingById(id),
      failOnStatusCode
    });
  }

  createBooking(bookingPayload) {
    return cy.request({
      method: "POST",
      url: Endpoints.booking,
      body: bookingPayload
    });
  }

  createBookingExpectFailure(bookingPayload) {
    return cy.request({
      method: "POST",
      url: Endpoints.booking,
      failOnStatusCode: false,
      body: bookingPayload
    });
  }

  // Update (REQUIRES token) 
  updateBooking(id, token, updatedPayload, failOnStatusCode = true) {
    return cy.request({
      method: "PUT",
      url: Endpoints.bookingById(id),
      failOnStatusCode,
      headers: {
        Cookie: `token=${token}`
      },
      body: updatedPayload
    });
  }

  // Partial Update (REQUIRES token) 
  partialUpdateBooking(id, token, partialPayload, failOnStatusCode = true) {
    return cy.request({
      method: "PATCH",
      url: Endpoints.bookingById(id),
      failOnStatusCode,
      headers: {
        Cookie: `token=${token}`
      },
      body: partialPayload
    });
  }

  // Delete (REQUIRES token) 
  deleteBooking(id, token, failOnStatusCode = true) {
    return cy.request({
      method: "DELETE",
      url: Endpoints.bookingById(id),
      failOnStatusCode,
      headers: {
        Cookie: `token=${token}`
      }
    });
  }
}

export default new BookingService();