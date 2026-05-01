import AuthForm from '../layout/auth-page/AuthPage';
import InputField from '../components/input-field/InputField';
import { useState } from 'react';
import { login } from '../api/auth';
import { ApiError } from '../api/error';
import type { ApiErrorResponse } from '../api/types/api';
import { useNavigate } from 'react-router';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ApiErrorResponse['error'] | null>(null);

  const handleOnchange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // send request to api
  const sendData: React.SubmitEventHandler = async (event) => {
    event.preventDefault();

    try {
      await login(formData);

      // redirect to home
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          return setErrors(err.errors);
        }
      }

      throw err;
    }
  };

  return (
    <AuthForm
      onSubmit={sendData}
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
        onChange={handleOnchange}
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
        onChange={handleOnchange}
        error={errors?.errors?.password?.message}
        required
      />
    </AuthForm>
  );
}
