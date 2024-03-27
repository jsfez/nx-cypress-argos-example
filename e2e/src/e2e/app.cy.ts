it('Screenshot a page', () => {
  cy.visit('https://argos-ci.com');
  cy.argosScreenshot('homepage');
});
