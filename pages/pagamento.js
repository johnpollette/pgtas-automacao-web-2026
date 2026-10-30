function preencherCartao(){
    cy.get('[data-qa=name-on-card]').type('John Doe');
        cy.get('[data-qa=card-number]').type('1234567890123456');
        cy.get('[data-qa=cvc]').type('111');
        cy.get('[data-qa=expiry-month').type('12');
        cy.get('[data-qa=expiry-year').type('2050');
        cy.get('[data-qa=pay-button').click();        
        cy.get('[data-qa="order-placed"] b').contains('Order Placed!')
        cy.get('[data-qa="continue-button"]').click();

}

export default {
    preencherCartao
    
  };