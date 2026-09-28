import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ofertasService } from '../services/api';

function Pagamento() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [erro, setErro] = useState('');
  const [metodo, setMetodo] = useState('pix');
  const [concluido, setConcluido] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const pixPayload = import.meta.env.VITE_PIX_PAYLOAD?.trim();

  async function copiarPix() {
    if (!pixPayload) return;
    await navigator.clipboard.writeText(pixPayload);
    setCopiado(true);
  }

  useEffect(() => {
    ofertasService.buscarPorId(id).then(setOferta).catch(() => setErro('Oferta não encontrada.'));
  }, [id]);

  if (erro) return <main className="pagamento-page"><p>{erro}</p></main>;
  if (!oferta) return <main className="pagamento-page"><p>Carregando pagamento...</p></main>;

  return (
    <main className="pagamento-page">
      <section className="pagamento-card">
        <Link className="pagamento-voltar" to={`/checkout/${id}`}>&larr; Voltar ao pedido</Link>
        {concluido ? (
          <div className="pagamento-sucesso" role="status">
            <span aria-hidden="true">✓</span>
            <h1>Pedido confirmado</h1>
            <p>{metodo === 'pix' ? 'Seu pedido está aguardando o pagamento via Pix.' : 'Seu pedido está aguardando a confirmação do cartão.'}</p>
            <Link to="/">Voltar para as ofertas</Link>
          </div>
        ) : (
          <>
            <h1>Pagamento</h1>
            <p className="pagamento-intro">Escolha como deseja pagar.</p>
            <div className="pagamento-resumo">
              <span>{oferta.titulo}</span>
              <strong>R$ {Number(oferta.preco_atual).toFixed(2)}</strong>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); setConcluido(true); }}>
              <fieldset className="pagamento-metodos">
                <legend>Forma de pagamento</legend>
                <label className={`pagamento-metodo${metodo === 'pix' ? ' selecionado' : ''}`}>
                  <input type="radio" name="metodo" value="pix" checked={metodo === 'pix'} onChange={() => setMetodo('pix')} />
                  <span className="pagamento-metodo__icone" aria-hidden="true">◇</span>
                  <span><strong>Pix</strong><small>Aprovação rápida</small></span>
                </label>
                <label className={`pagamento-metodo${metodo === 'cartao' ? ' selecionado' : ''}`}>
                  <input type="radio" name="metodo" value="cartao" checked={metodo === 'cartao'} onChange={() => setMetodo('cartao')} />
                  <span className="pagamento-metodo__icone" aria-hidden="true">▤</span>
                  <span><strong>Cartão</strong><small>Crédito ou débito</small></span>
                </label>
              </fieldset>

              {metodo === 'pix' ? (
                <div className="pagamento-pix">
                  {pixPayload ? (
                    <>
                      <p className="pagamento-ajuda">Escaneie o QR Code com o aplicativo do seu banco ou copie o código Pix.</p>
                      <div className="pagamento-qr" aria-label="QR Code para pagamento Pix">
                        <QRCodeSVG value={pixPayload} size={208} level="M" includeMargin />
                      </div>
                      <button className="pagamento-copiar" type="button" onClick={copiarPix}>
                        {copiado ? 'Código Pix copiado' : 'Copiar código Pix'}
                      </button>
                    </>
                  ) : (
                    <p className="pagamento-ajuda">O Pix ainda não está configurado.</p>
                  )}
                </div>
              ) : (
                <div className="pagamento-dados-cartao">
                  <label>Número do cartão<input required inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" maxLength={19} /></label>
                  <label>Nome impresso no cartão<input required autoComplete="cc-name" placeholder="Nome como aparece no cartão" /></label>
                  <div className="pagamento-campos-linha">
                    <label>Validade<input required autoComplete="cc-exp" placeholder="MM/AA" maxLength={5} /></label>
                    <label>CVV<input required inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} /></label>
                  </div>
                </div>
              )}
              <button className="pagamento-submit" type="submit">Continuar para pagamento</button>
              <p className="pagamento-seguranca">Pagamento processado com segurança.</p>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

export default Pagamento;
