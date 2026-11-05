describe('Duelo · tres criterios de aceptación', () => {
  it('US-01 CA1: el catálogo muestra 8 productos', () => {
    cy.visit('/');
    // Cypress reintenta el comando y la aserción hasta que se cumplan (o se acabe el tiempo).
    cy.get('h3').should('have.length', 8);
  });

  it('US-04 CA2: no deja agregar 7 mochilas de una vez (stock 6) y avisa', () => {
    cy.visit('/');
    // El alert() se escucha ANTES del clic; el stub guarda su texto.
    const aviso = cy.stub().as('aviso');
    cy.on('window:alert', aviso);

    cy.contains('h3', 'Mochila escolar').parent().within(() => {
      // El campo ya trae un 1: {selectall} lo reemplaza por 7 (con clear() la tienda lo vuelve a 1 y queda 17).
      cy.get('input[type=number]').type('{selectall}7').should('have.value', '7');
      cy.contains('button', 'Agregar').click();
    });

    cy.get('@aviso').should('have.been.calledWithMatch', /Solo hay 6 unidades/);
    cy.contains('Tu carrito está vacío.').should('be.visible');
  });

  it('US-09 CA1: DESC10 descuenta el 10 % del subtotal', () => {
    cy.visit('/');
    cy.contains('h3', 'Mochila escolar').parent().within(() => {
      cy.contains('button', 'Agregar').click();
    });

    cy.get('input[placeholder="Código de descuento"]').type('DESC10');
    cy.contains('button', 'Aplicar').click();

    // Mochila: $ 65.000 → el 10 % es $ 6.500
    cy.contains('dt', /^Descuento/).siblings('dd').should('contain.text', '6.500');
  });
});