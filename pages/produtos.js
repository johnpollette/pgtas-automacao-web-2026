function visitandoProductsPage() {
  //4. Click on 'Products' button
  cy.get('a[href="/products"]').click();
  //5. Verify user is navigated to ALL PRODUCTS page successfully
  cy.get("h2.title.text-center").should("have.text", "All Products");
}

function validarCaracteristicasDoProduto() {
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
}

function clicarEAdicionarProdutoAoCarrinho(){
     //clicar no produto
    cy.get('a[href="/product_details/1"]').click();

    //clicar no add to cart button
    cy.xpath(
      "/html/body/section/div/div/div[2]/div[2]/div[2]/div/span/button",
    ).click();
}

function procurarProduto(produto) {
  //6. Enter product name in search input and click search button
  cy.get("#search_product").type(produto);
  cy.get("#submit_search").click();
  //7. Verify 'SEARCHED PRODUCTS' is visible
  cy.get("h2.title.text-center").should("have.text", "Searched Products");
  //8. Verify all the products related to search are visible
  //Nao entendi o que significa "related to search", entao vou verificar se o produto pesquisado esta visivel na tela
  cy.get(".productinfo.text-center > p").should("have.text", produto);
}

export default {
  visitandoProductsPage,
  validarCaracteristicasDoProduto,
  procurarProduto,
  clicarEAdicionarProdutoAoCarrinho,
};
