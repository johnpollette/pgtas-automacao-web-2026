function preencherCampoSignIn(email, senha) {
  cy.get("[data-qa=login-email]").type(email);
  cy.get("[data-qa=login-password]").type(senha);
}

function preencherCampoSignUp(nome, email) {
  cy.get("input[data-qa=signup-name]").type(nome);
  cy.get("input[data-qa=signup-email]").type(email);
}

export default {
  preencherCampoSignIn,
  preencherCampoSignUp,
};
