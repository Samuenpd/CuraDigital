const ofertas = [
  {
    id: 1,
    titulo: 'Vitamina C 1g',
    descricao: 'Suplemento para demonstração',
    preco_original: 50,
    preco_atual: 35,
    imagem_url: '/vitamina-c.jpg',
    categoria: 'Vitaminas',
  },
];

describe('vitrine de ofertas', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ofertas*', (request) => {
      request.reply(ofertas.filter((oferta) =>
        !request.query.busca || oferta.titulo.toLowerCase().includes(request.query.busca.toLowerCase())
      ));
    }).as('listarOfertas');

    cy.visit('/');
    cy.wait('@listarOfertas');
  });

  it('apresenta oferta, preço e desconto', () => {
    cy.contains('h3', 'Vitamina C 1g').should('be.visible');
    cy.contains('-30%').should('be.visible');
    cy.contains('R$ 35.00').should('be.visible');
  });

  it('filtra a vitrine pela busca', () => {
    cy.get('input[type="search"]').type('vitamina');
    cy.wait('@listarOfertas');
    cy.contains('h3', 'Vitamina C 1g').should('be.visible');
    cy.get('input[type="search"]').clear();
    cy.wait('@listarOfertas');
  });

  it('abre os detalhes públicos de uma oferta', () => {
    cy.intercept('GET', '**/ofertas/1', ofertas[0]).as('detalheOferta');
    cy.contains('h3', 'Vitamina C 1g').click();
    cy.wait('@detalheOferta');
    cy.contains('h1', 'Vitamina C 1g').should('be.visible');
    cy.contains('button', 'Comprar').should('be.visible');
  });
});
