export function randomEmail() {
  return `qauser_${Date.now()}@example.com`;
}

export function futureDate(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}

export function randomPrice(min = 100, max = 5000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}