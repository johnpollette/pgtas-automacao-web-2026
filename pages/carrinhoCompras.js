function visitarcarrinhoDeCompras(){
    //9. Click 'view Cart' button
    cy.xpath('//*[@id="cartModal"]/div/div/div[2]/p[2]/a/u').click();

    //10. Verify that cart page is displayed
    cy.get(".active").should("have.text", "Shopping Cart");
}

export default{
    visitarcarrinhoDeCompras,

};