import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Login } from './index';

const { loginMock } = vi.hoisted(() => ({
  loginMock: vi.fn(),
}));

vi.mock('@/entities/auth/store/authStore', () => ({
  useAuthStore: (selector: (state: { login: (...args: unknown[]) => void }) => unknown) =>
    selector({ login: loginMock }),
}));

describe('Login - validação de formulário', () => {
  beforeEach(() => {
    loginMock.mockClear();
  });

  it('mostra erro para email inválido e senha curta', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText('Email'), 'invalido');
    await user.type(screen.getByLabelText('Senha'), '123');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(await screen.findByText('Email inválido')).toBeInTheDocument();
    expect(await screen.findByText('Senha deve ter ao menos 7 caracteres')).toBeInTheDocument();
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('submete com valores válidos', async () => {
    const user = userEvent.setup();
    render(<Login />);

    await user.type(screen.getByLabelText('Email'), 'user@test.com');
    await user.type(screen.getByLabelText('Senha'), '1234567');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('user@test.com', '1234567');
    });
  });
});
