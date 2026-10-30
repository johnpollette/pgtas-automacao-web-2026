import { pagamento } from "../../pages/pagamento";
import { cadastro } from "../../pages/cadastro";
import { homePage } from "../../pages/homePage";
const pagamentoCartao = require("../../pages/pagamento");
const preencherCadastroNovo = require("../../pages/cadastro");
const preencherSubscribe = require("../../pages/homePage");
const logandoUsuario = require("../../pages/homePage");
const clicarLoginPage = require("../../pages/homePage");
const deslogarUsuario = require("../../pages/homePage");
const usuarioIncorreto = require("../../pages/homePage");

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

    cy.get("input[data-qa=signup-name]").type("John pgats");
    //cy.get("input[data-qa=signup-email]").type("johnpgats001@example.com");
    cy.get("input[data-qa=signup-email]").type(
     `johnpgats${timestamp}@example.com`,
    );
    cy.get("button[data-qa=signup-button]").click();

    preencherCadastroNovo.preencherDadosCadastroNew();
  });

  //ok
  it("Exercício 2 - Login usuario com email e senha corretos", () => {
    cy.visit("/");
    cy.get("#slider-carousel").should("be.visible");

    clicarLoginPage.navegarLoginPage();

    logandoUsuario.logarUsuario("johnpgats001@example.com", "123456");
  });

  //ok
  it("Exercício 3 - Login usuario com email e senha incorretos", () => {
    cy.visit("/");

    // Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");

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
    cy.get("#slider-carousel").should("be.visible");

    clicarLoginPage.navegarLoginPage();

    logandoUsuario.logarUsuario("johnpgats001@example.com", "123456");

    deslogarUsuario.logoutUsuario();
  });

  it("Exercício 5 - Cadastrar novo usuario com email ja cadastrado no sistema", () => {
    cy.visit("/");
    //3. Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");
    //4. Click on 'Signup / Login' button
    cy.get("a[href*=login]").click();
    //5. Verify 'New User Signup!' is visible
    cy.get(".signup-form h2").should("have.text", "New User Signup!");
    //6. Enter name and already registered email address
    cy.get("input[data-qa=signup-name]").type("John pgats");
    cy.get("input[data-qa=signup-email]").type("johnpgats001@example.com");
    //7. Click 'Signup' button
    cy.get("[data-qa=signup-button]").click();
    //8. Verify error 'Email Address already exist!' is visible
    cy.get(".signup-form p").should(
      "have.text",
      "Email Address already exist!",
    );
  });

  it("Exercício 8 - Verificar todos os produtos e pagina de detalhes de produtos", () => {
    //   1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");

    //3. Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");

    //4. Click on 'Products' button
    cy.get('a[href="/products"]').click();
    //5. Verify user is navigated to ALL PRODUCTS page successfully
    cy.get("h2.title.text-center").should("have.text", "All Products");
    //6. The products list is visible

    //7. Click on 'View Product' of first product
    cy.get('a[href="/product_details/1"]').click();
    //8. User is landed to product detail page
    cy.url().should("include", "product_details");
    //9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
    //Assert nome do produto
    cy.get(".product-information > h2").should("have.text", "Blue Top");
    //Assert categoria do produto (usando AI para gerar o codigo)
    cy.contains("p", "Category: Women > Tops");
    //Assert preco do produto
    cy.get(".product-information > span > span").should("have.text", "Rs. 500");
    //Assert disponibilidade do produto
    cy.get("#quantity").should("have.value", "1");
    //Assert condicao do produto
    cy.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/p[3]").should(
      "have.text",
      "Condition: New",
    );
    //Assert marca do produto
    cy.xpath("/html/body/section/div/div/div[2]/div[2]/div[2]/div/p[4]").should(
      "have.text",
      "Brand: Polo",
    );
  });

  it("Exercício 9 - Pesquisar produto", () => {
    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");
    //4. Click on 'Products' button
    cy.get('a[href="/products"]').click();
    //5. Verify user is navigated to ALL PRODUCTS page successfully
    cy.get("h2.title.text-center").should("have.text", "All Products");
    //6. Enter product name in search input and click search button
    cy.get("#search_product").type("Blue Top");
    cy.get("#submit_search").click();
    //7. Verify 'SEARCHED PRODUCTS' is visible
    cy.get("h2.title.text-center").should("have.text", "Searched Products");
    //8. Verify all the products related to search are visible
    //Nao entendi o que significa "related to search", entao vou verificar se o produto pesquisado esta visivel na tela
    cy.get(".productinfo.text-center > p").should("have.text", "Blue Top");
  });

  //ok
  it("Exercício 10 - Verificar o subscricao na pagina inicial", () => {
    // 1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");
    preencherSubscribe.subscribe();
  });

  it("Exercício 15 - Criar ordem e registrar usuario antes do checkout", () => {
    const timestamp = Date.now();

    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");
    //4. Click on 'Products' button
    cy.get('a[href="/products"]').click();
    //6. Enter product name in search input and click search button
    cy.get("#search_product").type("Blue Top");
    cy.get("#submit_search").click();
    //8. Add products to cart
    /*
        //Tentei fazer o realhover mais travei no click - entao mudei para o clique no produto e add o produto da pagina dele diretamente.
        //cy.get('.btn.btn-default.add-to-cart').realHover().click();
          //cy.contains('button', 'Add to Cart').should('be.visible').click();
*/
    //clicar no produto
    cy.get('a[href="/product_details/1"]').click();
    //clicar no add to cart button
    cy.xpath(
      "/html/body/section/div/div/div[2]/div[2]/div[2]/div/span/button",
    ).click();

    //9. Click 'view Cart' button
    cy.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
    //10. Verify that cart page is displayed
    cy.get(".active").should("have.text", "Shopping Cart");
    //11. Click Proceed To Checkout
    cy.get(".col-sm-6 > a").click();
    //12 click on register/login button in checkout page
    cy.xpath('//*[@id="checkoutModal"]/div/div/div[2]/p[2]/a/u').click();
    //13 enter name on signup and email address
    cy.get("input[data-qa=signup-name]").type("John pgats");
    cy.get("input[data-qa=signup-email]").type(
      `johnpgats${timestamp}@example.com`,
    );
    //14 click signup button
    cy.get("button[data-qa=signup-button]").click();

    //15 fill all details in Signup and create account

    preencherCadastroNovo.preencherDadosCadastroNew();

    cy.get("[data-qa=continue-button]").click();

    // click on cart button
    cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a').click();
    // click on proceed to checkout
    cy.get(".col-sm-6 > a").click();

    //12. Verify Address Details and Review Your Order
    cy.get("#address_delivery").contains(".address_address1", "123 Main St");
    //13. Enter description in comment text area and click 'Place Order'
    cy.get(".form-control").type("Texto para teste do campo comments");

    // clicar no btn place order
    cy.get('a[href="/payment"]').click();
    //14. Enter payment details: Name on Card, Card Number, CVC, Expiration date

    pagamentoCartao.preencherCartao();
    cy.get("#slider-carousel").should("be.visible");
  });

  it("Exercício 16 - Criar ordem e fazer login do usuario antes do checkout", () => {
    //1. Launch browser
    //2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
    //3. Verify that home page is visible successfully
    cy.get("#slider-carousel").should("be.visible");
    //4. Click on 'Products' button
    cy.get('a[href="/products"]').click();
    //6. Enter product name in search input and click search button
    cy.get("#search_product").type("Blue Top");
    cy.get("#submit_search").click();
    //8. Add products to cart
    /*
        //Tentei fazer o realhover mais travei no click - entao mudei para o clique no produto e add o produto da pagina dele diretamente.
        //cy.get('.btn.btn-default.add-to-cart').realHover().click();
          //cy.contains('button', 'Add to Cart').should('be.visible').click();
*/
    //clicar no produto
    cy.get('a[href="/product_details/1"]').click();
    //clicar no add to cart button
    cy.xpath(
      "/html/body/section/div/div/div[2]/div[2]/div[2]/div/span/button",
    ).click();

    //9. Click 'view Cart' button
    cy.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();
    //10. Verify that cart page is displayed
    cy.get(".active").should("have.text", "Shopping Cart");
    //11. Click Proceed To Checkout
    cy.get(".col-sm-6 > a").click();
    //12 click on register/login button in checkout page
    cy.xpath('//*[@id="checkoutModal"]/div/div/div[2]/p[2]/a/u').click();
    // enter login e senha.
    cy.get("[data-qa=login-email]").type("johnpgats001@example.com");
    cy.get("[data-qa=login-password]").type("123456");
    //7. Click 'login' button
    cy.get("[data-qa=login-button]").click();
    //8. Verify that 'Logged in as username' is visible
    cy.get("#header").contains("Logged in as").should("be.visible");
    //9. Click 'view Cart' button
    //cy.get('a[href="/view_cart"]').click();
    cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a').click();
    //10. Verify that cart page is displayed
    cy.get(".active").should("have.text", "Shopping Cart");
    //11. Click Proceed To Checkout
    cy.get(".col-sm-6 > a").click();
    //12. Verify Address Details and Review Your Order
    cy.get("#address_delivery").contains(".address_address1", "123 Main St");
    //13. Enter description in comment text area and click 'Place Order'
    cy.get(".form-control").type("Texto para teste do campo comments");

    // clicar no btn place order
    cy.get('a[href="/payment"]').click();
    //14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    pagamentoCartao.preencherCartao();

    /*
        cy.get('[data-qa=name-on-card]').type('John Doe');
        cy.get('[data-qa=card-number]').type('1234567890123456');
        cy.get('[data-qa=cvc]').type('111');
        cy.get('[data-qa=expiry-month').type('12');
        cy.get('[data-qa=expiry-year').type('2050');
        cy.get('[data-qa=pay-button').click();


        cy.get('[data-qa="order-placed"] b').contains('Order Placed!')
        cy.get('[data-qa="continue-button"]').click();
        cy.get('#slider-carousel').should('be.visible');
*/

    //9. Verify that cart page is displayed
    //10. Click Proceed To Checkout
    //11. Verify Address Details and Review Your Order
    //12. Enter description in comment text area and click 'Place Order'
    //13. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    //14. Click 'Pay and Confirm Order' button
    //15. Verify success message 'Your order has been placed successfully!'
    //16. Click 'Delete Account' button
    //17. Verify 'ACCOUNT DELETED!' and click 'Continue' button*/
  });
});
