import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/entities/auth/store/authStore';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(7, { message: 'Senha deve ter ao menos 7 caracteres' }),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const login = useAuthStore((s) => s.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: LoginForm) {
    // simulate login
    login(data.email, data.password);
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Entrar</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <label htmlFor="login-email" className="block text-sm">Email</label>
          <input id="login-email" {...register('email')} className="w-full border rounded px-2 py-1" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm">Senha</label>
          <input id="login-password" type="password" {...register('password')} className="w-full border rounded px-2 py-1" />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 mt-2 rounded border bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--border))]"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
