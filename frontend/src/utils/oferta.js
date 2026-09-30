export function calcularDesconto(precoOriginal, precoAtual) {
  if (!Number.isFinite(precoOriginal) || precoOriginal <= 0 || !Number.isFinite(precoAtual)) {
    return 0;
  }

  return Math.max(0, Math.round(((precoOriginal - precoAtual) / precoOriginal) * 100));
}
