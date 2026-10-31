function subscribe() {
  //4. Scroll down to footer
  cy.get("#footer").scrollIntoView();
  //5. Verify text 'SUBSCRIPTION'
  cy.get(".single-widget > h2").should("have.text", "Subscription");
  //6. Enter email address in input and click arrow button
  cy.get("#susbscribe_email").type(`johnpgats${Date.now()}@example.com`);
  cy.get("#subscribe").click();
  //7. Verify success message 'You have been successfully subscribed!' is visible
  cy.contains("You have been successfully subscribed!").should("be.visible");
}

function logarUsuario(email, senha) {
  //6. Enter correct email address and password
  cy.get("[data-qa=login-email]").type(email);
  cy.get("[data-qa=login-password]").type(senha);
  //7. Click 'login' button
  cy.get("[data-qa=login-button]").click();
  //8. Verify that 'Logged in as username' is visible
  cy.get("#header li a").contains("Logged in as").should("be.visible");
}
function logarUsuarioIncorreto(email, senha) {
  //6. Enter correct email address and password
  cy.get("[data-qa=login-email]").type(email);
  cy.get("[data-qa=login-password]").type(senha);
  //7. Click 'login' button
  cy.get("[data-qa=login-button]").click();
  // 8. Verify error 'Your email or password is incorrect!' is visible
  cy.get(".login-form p").should(
    "have.text",
    "Your email or password is incorrect!",
  );
}

function validarHomePage(){
        cy.get("#slider-carousel").should("be.visible");

}

function navegarLoginPage() {
  //4. Click on 'Signup / Login' button
  cy.get("a[href*=login]").click();
  //5. Verify 'Login to your account' is visible
  cy.get(".login-form h2").should("have.text", "Login to your account");
}

function logoutUsuario() {
  //9. Click 'Logout' button
  cy.get("a[href*=logout]").click();
  //10. Verify that user is navigated to login page
  cy.get(".login-form h2").should("have.text", "Login to your account");
}

export default {
  subscribe,
  logarUsuario,
  navegarLoginPage,
  logoutUsuario,
  logarUsuarioIncorreto,
  validarHomePage,
};
