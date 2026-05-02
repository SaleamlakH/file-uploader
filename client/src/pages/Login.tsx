import AuthForm from '../layout/auth-page/AuthPage';
import InputField from '../components/input-field/InputField';
import { login, type LoginFormFields } from '../api/auth';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router';
import type { User } from '../api/types/api';

export default function Login() {
  const navigate = useNavigate();
  const { formData, errors, handleChange, handleSubmit } = useForm<
    LoginFormFields,
    User | undefined
  >({
    submitFn: login,
    initialData: {
      email: '',
      password: '',
    },
    onSuccess: () => navigate('/'),
  });

  return (
    <AuthForm
      onSubmit={handleSubmit}
      variant="login"
      title="Welcome Back"
      subtitle="Login to access you files"
    >
      <p style={{ color: 'hsl(0 80 60)', textAlign: 'center' }}>{errors?.message}</p>

      {/* Email */}
      <InputField
        type="email"
        label="Email Address"
        id="email"
        name="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors?.errors?.email?.message}
        required
        autoFocus
      />

      {/* Password */}
      <InputField
        type="password"
        id="password"
        name="password"
        label="Password"
        minLength={6}
        value={formData.password}
        onChange={handleChange}
        error={errors?.errors?.password?.message}
        required
      />
    </AuthForm>
  );
}
