import AuthForm from '../layout/auth-page/AuthPage';
import InputField from '../components/input-field/InputField';
import { login, type LoginFormFields } from '../api/auth';
import { useAuthForm } from '../hooks/useAuth';

export default function Login() {
  const { formData, errors, handleChange, handleSubmit } = useAuthForm<LoginFormFields>(login, {
    email: '',
    password: '',
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
