jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../src/models/Usuario');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../../src/models/Usuario');
const authService = require('../../src/services/authService');

describe('authService', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('registrar', () => {
    it('cria o usuário com a senha hasheada quando o e-mail é novo', async () => {
      UsuarioModel.buscarPorEmail.mockReturnValue(undefined);
      bcrypt.hash.mockResolvedValue('hash-fake');
      UsuarioModel.criar.mockReturnValue({ id: 1, nome: 'Ana', email: 'ana@exemplo.com' });

      const usuario = await authService.registrar({
        nome: 'Ana',
        email: 'ana@exemplo.com',
        senha: '123456',
      });

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(UsuarioModel.criar).toHaveBeenCalledWith({
        nome: 'Ana',
        email: 'ana@exemplo.com',
        senha_hash: 'hash-fake',
      });
      expect(usuario).toEqual({ id: 1, nome: 'Ana', email: 'ana@exemplo.com' });
    });

    it('rejeita com status 409 quando o e-mail já está cadastrado', async () => {
      UsuarioModel.buscarPorEmail.mockReturnValue({ id: 1 });

      await expect(
        authService.registrar({ nome: 'Ana', email: 'ana@exemplo.com', senha: '123456' })
      ).rejects.toMatchObject({ status: 409 });
    });
  });

  describe('login', () => {
    it('retorna token e dados do usuário quando as credenciais são válidas', async () => {
      UsuarioModel.buscarPorEmail.mockReturnValue({
        id: 1,
        nome: 'Ana',
        email: 'ana@exemplo.com',
        senha_hash: 'hash-fake',
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token-fake');

      const resultado = await authService.login({ email: 'ana@exemplo.com', senha: '123456' });

      expect(resultado.token).toBe('token-fake');
      expect(resultado.usuario).toEqual({ id: 1, nome: 'Ana', email: 'ana@exemplo.com' });
    });

    it('rejeita com status 401 quando o usuário não existe', async () => {
      UsuarioModel.buscarPorEmail.mockReturnValue(undefined);

      await expect(
        authService.login({ email: 'x@x.com', senha: '123456' })
      ).rejects.toMatchObject({ status: 401 });
    });

    it('rejeita com status 401 quando a senha está incorreta', async () => {
      UsuarioModel.buscarPorEmail.mockReturnValue({ id: 1, senha_hash: 'hash-fake' });
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        authService.login({ email: 'ana@exemplo.com', senha: 'errada' })
      ).rejects.toMatchObject({ status: 401 });
    });
  });
});
