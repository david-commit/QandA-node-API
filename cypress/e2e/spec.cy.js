describe('template spec', () => {
  it('passes', () => {
    cy.request('GET', 'http://localhost:8000/questions');

  });
});
