// Popula o banco com ofertas de exemplo, pra dar pra navegar e testar
// o front sem precisar cadastrar produto um por um na mão.
//
// Uso: dentro de backend/, rode `npm run seed`.
// Pode rodar quantas vezes quiser — ele sempre limpa a tabela antes
// de inserir de novo, então não duplica.

require('dotenv').config();
const db = require('../src/config/db');
const OfertaModel = require('../src/models/Oferta');

// imagem_url aceita:
//  a) null -> o front usa um placeholder automático (é o que está aqui embaixo)
//  b) uma URL externa, ex: 'https://images.unsplash.com/foto-do-produto.jpg'
//  c) uma imagem local sua, servida pelo backend — ver public/imagens/README.md,
//     ex: 'http://localhost:3000/imagens/vitamina-c.jpg'
const ofertas = [
  {
    titulo: 'Vitamina C 1g Efervescente',
    descricao: 'Tubo com 10 comprimidos efervescentes de vitamina C, sabor laranja.',
    preco_original: 24.9,
    preco_atual: 16.9,
    imagem_url: "http://localhost:3000/imagens/vitamina-c.jpg",
    categoria: 'Suplementos',
  },
  {
    titulo: 'Protetor Solar FPS 60',
    descricao: 'Proteção UVA/UVB de alta performance, toque seco, 200ml.',
    preco_original: 79.9,
    preco_atual: 79.9,
    imagem_url: "http://localhost:3000/imagens/protetor-solar.jpg",
    categoria: 'Dermocosméticos',
  },
  {
    titulo: 'Álcool em Gel 70% 500ml',
    descricao: 'Higienizante para as mãos, ação antisséptica.',
    preco_original: 12.9,
    preco_atual: 8.9,
    imagem_url: "http://localhost:3000/imagens/alcool-gel.jpg",
    categoria: 'Higiene',
  },
  {
    titulo: 'Termômetro Digital',
    descricao: 'Leitura rápida em 10 segundos, à prova d\'água.',
    preco_original: 39.9,
    preco_atual: 29.9,
    imagem_url: "http://localhost:3000/imagens/termometro-digital.jpg",
    categoria: 'Primeiros Socorros',
  },
  {
    titulo: 'Shampoo Anticaspa 400ml',
    descricao: 'Ação prolongada contra caspa e coceira no couro cabeludo.',
    preco_original: 34.9,
    preco_atual: 24.9,
    imagem_url: "http://localhost:3000/imagens/shampoo-anticaspa.jpg",
    categoria: 'Beleza',
  },
  {
    titulo: 'Fralda Infantil Pacote G',
    descricao: 'Pacote com 44 unidades, camada extra absorvente.',
    preco_original: 59.9,
    preco_atual: 44.9,
    imagem_url: "http://localhost:3000/imagens/fralda-infantil.jpg",
    categoria: 'Infantil',
  },
  {
    titulo: 'Colágeno Hidrolisado 300g',
    descricao: 'Suplemento em pó, sabor neutro, sem glúten.',
    preco_original: 89.9,
    preco_atual: 69.9,
    imagem_url: "http://localhost:3000/imagens/colageno.jpg",
    categoria: 'Suplementos',
  },
  {
    titulo: 'Repelente Corporal 100ml',
    descricao: 'Proteção de até 8 horas contra mosquitos.',
    preco_original: 22.9,
    preco_atual: 22.9,
    imagem_url: "http://localhost:3000/imagens/repelente.jpg",
    categoria: 'Higiene',
  },
  {
    titulo: 'Curativo Adesivo Kit 40un',
    descricao: 'Kit variado de curativos hipoalergênicos.',
    preco_original: 15.9,
    preco_atual: 9.9,
    imagem_url: "http://localhost:3000/imagens/curativo-kit.jpg",
    categoria: 'Primeiros Socorros',
  },
  {
    titulo: 'Hidratante Corporal 400ml',
    descricao: 'Textura leve, absorção rápida, com vitamina E.',
    preco_original: 32.9,
    preco_atual: 21.9,
    imagem_url: "http://localhost:3000/imagens/hidradante-corporal.jpg",
    categoria: 'Dermocosméticos',
  },
  {
    titulo: 'Máscara Descartável Facial  - 100 Unidades ',
    descricao: 'Tripla Camada de Proteção Filtro Branca',
    preco_original: 70.9,
    preco_atual: 30.9,
    imagem_url: "http://localhost:3000/imagens/mascara-descartaveis.jpg",
    categoria : 'Dermocosméticos',
  },
  {
    titulo: 'Absorvente Sempre Livre - 8 unidades',
    descricao:  'conforto Noturno Com abas',
    preco_original: 14.99,
    preco_atual: 9.99,
    imagem_url: 'http://localhost:3000/imagens/absorventes-duas-abas.jpg',
    categoria : 'dermocosmeticos'
  },
  {
    titulo: 'protetor solar facial 40g',
    descricao: 'protetor facil com FPS 50 com textura leve',
    preco_original: 49.99,
    preco_atual: 34.99,
    imagem_url: 'http://localhost:3000/imagens/protetor-solar-laranja.jpg',
    categoria :'dermoscosmeticos'
  },
  {
   titulo:'Fralda pamper confort sec tamanho xg 86 unidade',
   descricao:'ajustes anatomicos e loção hipoarlegica para a pele do bebe',
   preco_original:119.99,
   preco_atual: 99.99,
   imagem_url: 'http://localhost:3000/imagens/fralda-pampers.jpg',
   categoria: 'dermoscosmeticos'
  },
  {
    titulo: 'Minoxidil Tubinado 120ml',
   descricao: 'Indicado para controle da queda de cabelo',
   preco_original: 141,
   preco_atual:  42 ,
   imagem_url: 'http://localhost:3000/imagens/minoxidil.jpg',
   categoria: 'dermoscosmeticos'
  },
  {
    titulo: 'Colirio Lubrificante 10ml',
  descricao: 'colirio lubrificante',
  preco_original: 119.99,
  preco_atual: 95.99,
  imagem_url: 'http://localhost:3000/imagens/colirio_lubrificante.jpg',
  categoria: 'dermoscosmeticos'
    },
    {
      titulo: 'Desodorante Super Men Citrus 250ml',
    descricao:'Desodorante Super Men Citrus Aerossol',
    preco_original: 23.90,
    preco_atual: 10.99,
    imagem_url: 'http://localhost:3000/imagens/desodorante.jpg',
    categoria: 'dermoscosmeticos'

  },
 
