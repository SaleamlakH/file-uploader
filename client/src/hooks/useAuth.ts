import { useState } from 'react';
import type { ApiErrorResponse, User } from '../api/types/api';
import { ApiError } from '../api/error';
import { useNavigate } from 'react-router';

type SubmitFn<T> = (data: T) => Promise<User | undefined>;

export const useAuthForm = <TData>(submitFn: SubmitFn<TData>, InitialData: TData) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => InitialData);
  const [errors, setErrors] = useState<ApiErrorResponse['error'] | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // send request to api
  const handleSubmit: React.SubmitEventHandler = async (event) => {
    event.preventDefault();

    try {
      await submitFn(formData);
      navigate('/');
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          setErrors(err.errors);
          return;
        }
      }

      throw err;
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};
