const BASE_URL = Cypress.env("apiBaseUrl");

const Endpoints = {
  booking: `${BASE_URL}/booking`,
  bookingById: (id) => `${BASE_URL}/booking/${id}`,
  auth: `${BASE_URL}/auth`,
  ping: `${BASE_URL}/ping`
};

export default Endpoints;