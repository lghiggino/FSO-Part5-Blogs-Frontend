/* eslint-disable no-undef */
describe("Blog app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3002");
    cy.contains("blogs");
    cy.contains("Blog 02");
    cy.contains("Leonardo N Ghiggino");
  });
});
