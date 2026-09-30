import { describe, expect, test } from '@jest/globals';
import { calcularDesconto } from '../../src/utils/oferta.js';

describe('calcularDesconto', () => {
  test('calcula e arredonda o percentual de desconto', () => {
    expect(calcularDesconto(100, 79.9)).toBe(20);
  });

  test('não informa desconto quando o preço atual é maior ou igual', () => {
    expect(calcularDesconto(100, 100)).toBe(0);
    expect(calcularDesconto(100, 120)).toBe(0);
  });

  test('evita divisão por zero e valores inválidos', () => {
    expect(calcularDesconto(0, 10)).toBe(0);
    expect(calcularDesconto(100, Number.NaN)).toBe(0);
  });
});
