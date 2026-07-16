import BookingService from "../../services/BookingService";
import { randomPrice, futureDate } from "../../utils/testDataHelper";

describe("Token-Authenticated Booking API Tests", () => {

  let bookingData;
  let token;
  let createdBookingId;

  const adminUsername = Cypress.env("adminUsername");
  const adminPassword = Cypress.env("adminPassword");

  before(() => {
    BookingService.createToken(adminUsername, adminPassword).then((generatedToken) => {
      token = generatedToken;
      expect(token).to.be.a("string").and.not.be.empty;
    });
  });

  beforeEach(() => {
    cy.fixture("booking").then((data) => {
      bookingData = data;
    });
  });

  it("Positive - CreateToken returns a valid token", () => {
    BookingService.createToken(adminUsername, adminPassword).then((generatedToken) => {
      expect(generatedToken).to.be.a("string");
      expect(generatedToken.length).to.be.greaterThan(0);
    });
  });

  it("Negative - CreateToken with wrong credentials returns no token", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiBaseUrl")}/auth`,
      body: { username: "wronguser", password: "wrongpass" }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("reason", "Bad credentials");
      expect(response.body).to.not.have.property("token");
    });
  });

  it("Positive - Create a booking to use in update/delete tests", () => {
    const payload = {
      ...bookingData.validBooking,
      totalprice: randomPrice(),
      bookingdates: {
        checkin: futureDate(1),
        checkout: futureDate(5)
      }
    };

    BookingService.createBooking(payload).then((response) => {
      expect(response.status).to.eq(200);
      createdBookingId = response.body.bookingid;
      expect(createdBookingId).to.exist;
    });
  });

  it("Positive - UpdateBooking (PUT) with valid token succeeds", () => {
    const updatedPayload = {
      ...bookingData.validBooking,
      firstname: "UpdatedName",
      totalprice: randomPrice() 
    };

    BookingService.updateBooking(createdBookingId, token, updatedPayload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.eq("UpdatedName");
    });
  });

  it("Negative - UpdateBooking (PUT) without valid token is rejected", () => {
    const updatedPayload = { ...bookingData.validBooking, firstname: "ShouldFail" };

    BookingService.updateBooking(createdBookingId, "invalid-token", updatedPayload, false)
      .then((response) => {
        expect(response.status).to.eq(403);
      });
  });

  it("Positive - PartialUpdateBooking (PATCH) with valid token succeeds", () => {
    BookingService.partialUpdateBooking(createdBookingId, token, { firstname: "PatchedName" })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq("PatchedName");
      });
  });

  it("Positive - DeleteBooking with valid token succeeds", () => {
    BookingService.deleteBooking(createdBookingId, token).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it("Failure - GetBooking on deleted ID returns 404", () => {
    BookingService.getBookingById(createdBookingId, false).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("Negative - DeleteBooking without valid token is rejected", () => {
    BookingService.deleteBooking(999999, "invalid-token", false).then((response) => {
      expect(response.status).to.eq(403);
    });
  });

});