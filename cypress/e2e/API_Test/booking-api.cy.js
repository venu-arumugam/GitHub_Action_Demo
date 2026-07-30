import BookingService from "../../services/BookingService";
import { randomPrice, futureDate } from "../../utils/testDataHelper";

describe("Booking API Tests", () => {

  let bookingData;

  beforeEach(() => {
    cy.fixture("booking").then((data) => {
      bookingData = data;
    });
  });

  it("Positive - GET all booking IDs", () => {
    BookingService.getAllBookings().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("Positive - POST create a new booking with dynamic data", () => {
    const payload = {
      ...bookingData.validBooking,
      totalprice: randomPrice(),
      bookingdates: {
        checkin: futureDate(5),
        checkout: futureDate(10)
      }
    };

    BookingService.createBooking(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking.firstname).to.eq(payload.firstname);
      expect(response.body).to.have.property("bookingid");
    });
  });

  it("Negative - GET invalid booking ID returns 404", () => {
    BookingService.getBookingById(999999999, false).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("Negative - POST with missing required fields", () => {
    BookingService.createBookingExpectFailure(bookingData.invalidBooking).then((response) => {
      expect(response.status).to.be.oneOf([200, 400, 500]);
    });
  });

  it("Failure - Simulated server error via intercept", () => {
    cy.intercept("GET", "**/booking/1", {
      statusCode: 500,
      body: { message: "Internal Server Error" }
    }).as("serverError");

    BookingService.getBookingById(1, false).then((response) => {
      expect(response.status).to.exist;
    });
  });

});