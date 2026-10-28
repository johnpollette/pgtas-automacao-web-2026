function iniciarCadastro(nome, email) {
            const timestamp = Date.now();

  //cy.get('input[data-qa=signup-name]').type('John pgats');
  cy.get('input[data-qa=signup-name]').type(nome);

    //cy.get('input[data-qa=signup-email]').type('johnpgats001@example.com');
    //cy.get('input[data-qa=signup-email]').type(`johnpgats${timestamp}@example.com`);
        cy.get('input[data-qa=signup-email]').type(email);
    cy.get('button[data-qa=signup-button]').click();
        }

function preencherCadastro() {
        cy.get('#id_gender2').check();

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

 
 function verificarCadastroEfetuadoComSucesso() {
        cy.get('[data-qa="account-created"]').click();
        cy.get('[data-qa="account-created"]')
        .should('be.visible')
        .and('contain.text', 'Account Created!');

 }

 function verificarSeMensagemDeCadastroExistenteFoiExibida() {
        cy.get('form[action*="signup"]  p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('have.text', 'Email Address already exist!');
}

 module.exports = {
    iniciarCadastro,
    preencherCadastro,
    verificarCadastroEfetuadoComSucesso,
    verificarSeMensagemDeCadastroExistenteFoiExibida
  };