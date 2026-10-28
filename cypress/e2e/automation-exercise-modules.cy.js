import {index} from '../modules/cadastro/index'
const cadastro = require('../modules/cadastro/index')

describe('Automation Exercise', () => {
  it.only('Cadastrar um novo usuario com sucesso', () => {
    cy.visit('https://automationexercise.com/login');
    
        cadastro.iniciarCadastro('John pgats', `johnpgats${Date.now()}@example.com`);


        cadastro.preencherCadastro();

        cadastro.verificarCadastroEfetuadoComSucesso();


    })

  it('Efetuar login de usuario com email e senhas corretos ', () => {
      cy.visit('https://automationexercise.com/login');

      preencherLogin('johnpgats001@example.com', '123456');

      verificarSeLoginFoiEfetuadoComSucesso();


    });

   it('Efetuar login de usuario com email e senhas INCORRETOS', () => {
        // 1. Launch browser
        // Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/login');

        preencherLogin('johnpgats001@example.com', '654321');

        verificarSeMensagemDeErroFoiExibidaNoLogin();


    });

    it('Efetuar Logout', () => {
        //1. Launch browser
        //2. Navigate to url 'http://automationexercise.com'
        cy.visit('https://automationexercise.com/login');
        
        preencherLogin('johnpgats001@example.com', '123456');

        efetuarLogout();

        verificarSeUsuarioFoiDeslogado();


        
    });

    it('Tentar cadastrar usuario com e-mail ja cadastrado', () => {
        //1. Launch browser
        cy.visit('https://automationexercise.com/login');
//3. Verify that home page is visible successfully
//4. Click on 'Signup / Login' button
        cy.get('a[href*=login]').click();

        cadastro.iniciarCadastro('John pgats', 'johnpgats001@example.com');
        cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
    });
});

/*
funcao movida para o arquivo index.js para ser utilizada em outros testes
function iniciarCadastro(nome, email) {
            const timestamp = Date.now();

  //cy.get('input[data-qa=signup-name]').type('John pgats');
  cy.get('input[data-qa=signup-name]').type(nome);

    //cy.get('input[data-qa=signup-email]').type('johnpgats001@example.com');
    //cy.get('input[data-qa=signup-email]').type(`johnpgats${timestamp}@example.com`);
        cy.get('input[data-qa=signup-email]').type(email);
    cy.get('button[data-qa=signup-button]').click();
        }

        */

        /*
funcao movida para o arquivo index.js para ser utilizada em outros testes
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
        */

 function preencherLogin(email, senha) {
        cy.get('[data-qa=login-email]').type(email);
        cy.get('[data-qa=login-password]').type(senha);

        cy.get('[data-qa=login-button]').click();
 }

 function verificarSeLoginFoiEfetuadoComSucesso() {
        cy.contains('#header li b', 'John pgats')

        
        cy.get('#header li b')
        .contains('John pgats')
        .should('be.visible');

 }

 function verificarSeMensagemDeErroFoiExibidaNoLogin() {
        cy.get('form[action*="login"] > p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Your email or password is incorrect!')
        .and('have.text', 'Your email or password is incorrect!');


 }

 function efetuarLogout() {
        cy.get('a[href*=logout]')
        .should('be.visible')
        .click();
 }

 function verificarSeUsuarioFoiDeslogado(){
        cy.get('.login-form > h2').should('be.visible')
        cy.get('a[href*="logout"]').should('not.exist')
        cy.get('[action*="login"]').should('be.visible')
        cy.url().should('include', 'login')
}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
        cy.get('form[action*="signup"]  p')
        .should('exist')
        .should('be.visible')
        .should('contain', 'Email Address already exist!')
        .and('have.text', 'Email Address already exist!');
}