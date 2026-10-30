function preencherDadosCadastroNew(){
    cy.get('#id_gender1').check();
    cy.get('input[data-qa=password]').type('123456');
    cy.get('#days').select('1');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');
    cy.get('#newsletter').check();
    cy.get('[data-qa=first_name]').type('John');
    cy.get('[data-qa=last_name]').type('Doe');
    cy.get('[data-qa=address]').type('123 Main St');
    cy.get('[data-qa=country]').select('United States');
    cy.get('[data-qa=state]').type('California');
    cy.get('[data-qa=city]').type('Los Angeles');
    cy.get('[data-qa=zipcode]').type('90001');
    cy.get('[data-qa=mobile_number]').type('+1 1234567890');

    cy.get('[data-qa=create-account]').click();
}

export default {
    preencherDadosCadastroNew
    
  };