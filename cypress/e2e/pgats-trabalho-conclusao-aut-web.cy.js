import { pagamento } from "../../pages/pagamento";
import { cadastro } from "../../pages/cadastro";
import { homePage } from "../../pages/homePage";
import { signInUp } from "../../pages/signInUp";
import { produtos } from "../../pages/produtos";
import { carrinhoDeCompras } from "../../pages/carrinhoDeCompras";
import { checkout } from "../../pages/checkout";
const pagamentoCartao = require("../../pages/pagamento");
const preencherCadastroNovo = require("../../pages/cadastro");
const preencherSubscribe = require("../../pages/homePage");
const logandoUsuario = require("../../pages/homePage");
const clicarLoginPage = require("../../pages/homePage");
const deslogarUsuario = require("../../pages/homePage");
const usuarioIncorreto = require("../../pages/homePage");
const telaLogin = require("../../pages/signInUp");
const paginaProdutos = require("../../pages/produtos");
const paginaCarrinho = require("../../pages/carrinhoDeCompras");
const checkoutPage = require("../../pages/checkout");
const validarHomePage = require("../../pages/homePage");

/*
implementar exercicios 1.2.3.4.5.8.9.10.15.16
projeto com github actions
atencao as bibliotecas
modularizacao do codigo ou aplicacao de padrao
boas praticas de desenvolvimento - retry, url base, page object, fixtures, data driven, etc
relatorio mockawesome integrado html ou outro 
*/

describe("Projeto deAutomação de Conclusão de Disciplina web Pgats 2026", () => {
  const timestamp = Date.now();

  it("Exercício 1 - Registrar usuario", () => {
    cy.visit("/");
    cy.get("a[href*=login]").click();

    telaLogin.preencherCampoSignUp(
      "John pgats",
      `johnpgats${timestamp}@example.com`,
    );

    cy.get("button[data-qa=signup-button]").click();

    preencherCadastroNovo.preencherDadosCadastroNew();
  });

  //ok
  it("Exercício 2 - Login usuario com email e senha corretos", () => {
    cy.visit("/");
    validarHomePage.validarHomePage();

    clicarLoginPage.navegarLoginPage();

    logandoUsuario.logarUsuario("johnpgats001@example.com", "123456");
  });

  //ok
  it("Exercício 3 - Login usuario com email e senha incorretos", () => {
    cy.visit("/");

    // Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    clicarLoginPage.navegarLoginPage();

    // 6. Enter incorrect email address and password
    usuarioIncorreto.logarUsuarioIncorreto(
      "incorrect@example.com",
      "wrongpassword",
    );
  });

  //ok
  it("Exercício 4 - Logar com usuario cadastrado e efetuar logout", () => {
    cy.visit("/");
    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    clicarLoginPage.navegarLoginPage();

    logandoUsuario.logarUsuario("johnpgats001@example.com", "123456");

    deslogarUsuario.logoutUsuario();
  });

  //ok
  it("Exercício 5 - Cadastrar novo usuario com email ja cadastrado no sistema", () => {
    cy.visit("/");
    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    //4. Click on 'Signup / Login' button
    //5. Verify 'New User Signup!' is visible
    clicarLoginPage.navegarLoginPage();
    //6. Enter name and already registered email address
    telaLogin.preencherCampoSignUp("John pgats", "johnpgats001@example.com");

    //logandoUsuario.logarUsuario("johnpgats001@example.com", "123456");

    //7. Click 'Signup' button
    cy.get("[data-qa=signup-button]").click();

    //8. Verify error 'Email Address already exist!' is visible
    cy.get(".signup-form p").should(
      "have.text",
      "Email Address already exist!",
    );
  });

  //ok
  it("Exercício 8 - Verificar todos os produtos e pagina de detalhes de produtos", () => {
    //   1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");

    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    //Navegando para a pagina de produtos.
    paginaProdutos.visitandoProductsPage();

    //6. The products list is visible
    paginaProdutos.validarCaracteristicasDoProduto();
  });

  //ok
  it("Exercício 9 - Pesquisar produto", () => {
    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    //4. Click on 'Products' button e validando pagina.
    paginaProdutos.visitandoProductsPage();

    paginaProdutos.procurarProduto("Blue Top");
  });

  //ok
  it("Exercício 10 - Verificar o subscricao na pagina inicial", () => {
    cy.visit("/");
    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();
    preencherSubscribe.subscribe();
  });

  it("Exercício 15 - Criar ordem e registrar usuario antes do checkout", () => {
    const timestamp = Date.now();

    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    //4. Click on 'Products' button e validando pagina.
    paginaProdutos.visitandoProductsPage();

    //6. Enter product name in search input and click search button

    paginaProdutos.procurarProduto("Blue Top");

    //8. Add products to cart
    /*
        //Tentei fazer o realhover mais travei no click - entao mudei para o clique no produto e add o produto da pagina dele diretamente.
        //cy.get('.btn.btn-default.add-to-cart').realHover().click();
          //cy.contains('button', 'Add to Cart').should('be.visible').click();
*/
    paginaProdutos.clicarEAdicionarProdutoAoCarrinho();

    paginaCarrinho.visitarPaginaCarrinho();

    checkoutPage.checkoutUsuarioNovo();

    //15 fill all details in Signup and create account

    preencherCadastroNovo.preencherDadosCadastroNew();

    cy.get("[data-qa=continue-button]").click();

    checkoutPage.acessarCheckoutPage();

    checkoutPage.checarInfoEPlaceOrder();

    //14. Enter payment details: Name on Card, Card Number, CVC, Expiration date

    pagamentoCartao.preencherCartao();
    //Validando que ao final da compra voltou para pagina inicial.
    validarHomePage.validarHomePage();
  });

  it("Exercício 16 - Criar ordem e fazer login do usuario antes do checkout", () => {
    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    validarHomePage.validarHomePage();

    //4. Click on 'Products' button
    paginaProdutos.visitandoProductsPage();

    //6. Enter product name in search input and click search button
    paginaProdutos.procurarProduto("Blue Top");

    //8. Add products to cart
    /*
        //Tentei fazer o realhover mais travei no click - entao mudei para o clique no produto e add o produto da pagina dele diretamente.
        //cy.get('.btn.btn-default.add-to-cart').realHover().click();
          //cy.contains('button', 'Add to Cart').should('be.visible').click();
*/
    //clicar no produto
    //clicar no add to cart button
    paginaProdutos.clicarEAdicionarProdutoAoCarrinho();

    //9. Click 'view Cart' button
    //10. Verify that cart page is displayed
    paginaCarrinho.visitarPaginaCarrinho();

    //11. Click Proceed To Checkout
    //12 click on register/login button in checkout page
    // enter login e senha.
    //7. Click 'login' button
    //8. Verify that 'Logged in as username' is visible
    checkoutPage.checkoutUsuarioCadastrado();

    //9. Click 'view Cart' button
    //cy.get('a[href="/view_cart"]').click();
    cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a').click();
    //10. Verify that cart page is displayed
    cy.get(".active").should("have.text", "Shopping Cart");

    //11. Click Proceed To Checkout
    cy.get(".col-sm-6 > a").click();

    //12. Verify Address Details and Review Your Order
    //13. Enter description in comment text area and click 'Place Order'
    // clicar no btn place order
    checkoutPage.checarInfoEPlaceOrder();

    //14. Enter payment details: Name on Card, Card Number, CVC, Expiration date

    pagamentoCartao.preencherCartao();
  });
});
