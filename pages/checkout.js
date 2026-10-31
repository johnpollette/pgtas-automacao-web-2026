function checkoutUsuarioNovo() {
  const timestamp = Date.now();
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
}

function checkoutUsuarioCadastrado() {
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

}

function acessarCheckoutPage() {
  // click on cart button
  cy.xpath('//*[@id="header"]/div/div/div/div[2]/div/ul/li[3]/a').click();

  // click on proceed to checkout
  cy.get(".col-sm-6 > a").click();
}
function checarInfoEPlaceOrder() {
  //12. Verify Address Details and Review Your Order
  cy.get("#address_delivery").contains(".address_address1", "123 Main St");
  //13. Enter description in comment text area and click 'Place Order'
  cy.get(".form-control").type("Texto para teste do campo comments");

  // clicar no btn place order
  cy.get('a[href="/payment"]').click();
}

export default {
  checkoutUsuarioNovo,
  checkoutUsuarioCadastrado,
  checarInfoEPlaceOrder,
  acessarCheckoutPage,
};
