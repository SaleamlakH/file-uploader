import AuthForm from '../layout/auth-page/AuthPage';
import InputField from '../components/input-field/InputField';

export default function Signup() {
  return (
    <AuthForm variant="signup" title="Get Started" subtitle="Create your free account">
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
      <InputField type="password" id="password" name="password" label="Password" min={6} required />

      {/* Confirm password */}
      <InputField
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        required
      />
    </AuthForm>
  );
}
