describe('Automation Exercise', () => {
  it('Cadastrar um novo usuario com sucesso', () => {
    cy.visit('/');
    cy.get('a[href*=login]').click();

    const timestamp = Date.now();
    cy.get('input[data-qa=signup-name]').type('John pgats');
    cy.get('input[data-qa=signup-email]').type('johnpgats001@example.com');
    //cy.get('input[data-qa=signup-email]').type(`johnpgats${timestamp}@example.com`);
    cy.get('button[data-qa=signup-button]').click();

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


    })

    it('test case 2', () => {
      cy.visit('/');
      cy.get('#slider-carousel').should('be.visible');

      //4. Click on 'Signup / Login' button
      cy.get('a[href*=login]').click(); 

      //5. Verify 'Login to your account' is visible
      cy.get('.login-form h2').should('have.text', 'Login to your account');
      //6. Enter correct email address and password
      cy.get('[data-qa=login-email]').type('johnpgats001@example.com');
      cy.get('[data-qa=login-password]').type('123456');
      //7. Click 'login' button
        cy.get('[data-qa=login-button]').click();
      //8. Verify that 'Logged in as username' is visible
      cy.get('#header').contains('Logged in as').should('be.visible');
      //9. Click 'Delete Account' button
      cy.get('a[href*=delete_account]').click();
      //10. Verify that 'ACCOUNT DELETED!' is visible
      cy.get('.title.text-center').should('have.text', 'ACCOUNT DELETED!');
    });

    it('test case 3', () => {
        // 1. Launch browser
        // Navigate to url 'http://automationexercise.com'
        cy.visit('/');

// Verify that home page is visible successfully
        cy.get('#slider-carousel').should('be.visible');
// Click on 'Signup / Login' button
        cy.get('a[href*=login]').click();

// Verify 'Login to your account' is visible
        cy.get('.login-form h2').should('have.text', 'Login to your account');

// 6. Enter incorrect email address and password
        cy.get('[data-qa=login-email]').type('incorrect@example.com');
        cy.get('[data-qa=login-password]').type('wrongpassword');

// 7. Click 'login' button
        cy.get('[data-qa=login-button]').click();

// 8. Verify error 'Your email or password is incorrect!' is visible
        cy.get('.login-form p').should('have.text', 'Your email or password is incorrect!');
    });

    it('test case 4', () => {
        //1. Launch browser
        //2. Navigate to url 'http://automationexercise.com'
        cy.visit('/');
        //3. Verify that home page is visible successfully
        cy.get('#slider-carousel').should('be.visible');
        //4. Click on 'Signup / Login' button
        cy.get('a[href*=login]').click();
        //5. Verify 'Login to your account' is visible
        cy.get('.login-form h2').should('have.text', 'Login to your account');
        //6. Enter correct email address and password
        cy.get('[data-qa=login-email]').type('johnpgats001@example.com');
        cy.get('[data-qa=login-password]').type('123456');
        //7. Click 'login' button
        cy.get('[data-qa=login-button]').click();
        //8. Verify that 'Logged in as username' is visible
        cy.get('#header li a').contains('Logged in as').should('be.visible');
        //9. Click 'Logout' button
        cy.get('a[href*=logout]').click();
        //10. Verify that user is navigated to login page
        cy.get('.login-form h2').should('have.text', 'Login to your account');
    });

    it('test case 5', () => {
        //1. Launch browser
//2. Navigate to url 'http://automationexercise.com'
        cy.visit('/');
//3. Verify that home page is visible successfully
        cy.get('#slider-carousel').should('be.visible');
//4. Click on 'Signup / Login' button
        cy.get('a[href*=login]').click();
//5. Verify 'New User Signup!' is visible
        cy.get('.signup-form h2').should('have.text', 'New User Signup!');
//6. Enter name and already registered email address
        cy.get('input[data-qa=signup-name]').type('John pgats');
        cy.get('input[data-qa=signup-email]').type('johnpgats001@example.com');
//7. Click 'Signup' button
        cy.get('[data-qa=signup-button]').click();
//8. Verify error 'Email Address already exist!' is visible
        cy.get('.signup-form p').should('have.text', 'Email Address already exist!');
    });
});