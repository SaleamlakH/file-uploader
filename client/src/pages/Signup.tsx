import AuthForm from '../layout/auth-page/AuthPage';
import InputField from '../components/input-field/InputField';
import { useForm } from '../hooks/useForm';
import { signup, type SignupFormFields } from '../api/auth';
import { useNavigate } from 'react-router';
import type { User } from '../api/types/api';

export default function Signup() {
  const navigate = useNavigate();

  const { formData, errors, handleChange, handleSubmit } = useForm<
    SignupFormFields,
    User | undefined
  >({
    submitFn: signup,
    onSuccess: () => navigate('/'),
    initialData: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <AuthForm
      onSubmit={handleSubmit}
      variant="signup"
      title="Get Started"
      subtitle="Create your free account"
    >
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
        min={6}
        value={formData.password}
        onChange={handleChange}
        error={errors?.errors?.password?.message}
        required
      />

      {/* Confirm password */}
      <InputField
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors?.errors?.confirmPassword?.message}
        required
      />
    </AuthForm>
  );
}
