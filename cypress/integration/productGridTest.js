/* eslint-disable max-len */
describe('first cy test', () => {
  it('does nothing', () => {
    cy.visit('/');
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').should('exist');
  });


  /* ==== Test Created with Cypress Studio ==== */
  it('formInput', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:7891/');
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').type('Mango');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').type('Yummy');
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').type('1');
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').type('1000');
    cy.get('.MuiButton-label > [style="cursor: pointer;"]').click();
    cy.get('#img').click({ force: true });
    cy.get('.MuiTypography-root').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Adding products to Table', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').type('Lychee');
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').type('Sweet and Floral');
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').type('2');
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').type('19');
    cy.get('.MuiButton-label > [style="cursor: pointer;"]').click();
    cy.get('#img').click({ force: true });
    cy.get('.MuiTypography-root').click();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').type('Kiwi');
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').type('Green and zesty');
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').type('2.50');
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').type('972318123');
    cy.get('.MuiButton-label > [style="cursor: pointer;"]').click();
    cy.get('#img').click({ force: true });
    cy.get('[data-testid=product-form]').click();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[style="width: 100vw; display: flex; justify-content: space-around;"]').click();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('.MuiTypography-root').click();
    cy.get('.MuiTypography-root').click();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').click();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=title-input] > .MuiInputBase-root > .MuiInputBase-input').type('Kiwi');
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=description-input] > .MuiInputBase-root > .MuiInputBase-input').type('zesy');
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=price-input] > .MuiInputBase-root > .MuiInputBase-input').type('18');
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').clear();
    cy.get('[data-testid=quantity-input] > .MuiInputBase-root > .MuiInputBase-input').type('12319');
    cy.get('.MuiTypography-root').click();
    /* ==== End Cypress Studio ==== */
  });

});
