import AuthForm from '../layout/auth-page/AuthPage';
import InputField from '../components/input-field/InputField';

export default function Login() {
  return (
    <AuthForm variant="login" title="Welcome Back" subtitle="Login to access you files">
      {/* Email */}
      <InputField
        type="email"
        label="Email Address"
        id="email"
        name="email"
        placeholder="you@example.com"
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
        required
      />
    </AuthForm>
  );
}
