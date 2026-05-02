import { useState } from 'react';
import type { ApiErrorResponse } from '../api/types/api';
import { ApiError } from '../api/error';

type SubmitFn<TData, TResult> = (data: TData) => Promise<TResult>;

type UseFormOptions<TData, TResult> = {
  initialData: TData;
  submitFn: SubmitFn<TData, TResult>;
  onSuccess?: (result: TResult) => void;
};

export const useForm = <TData, TResult = unknown>({
  submitFn,
  initialData,
  onSuccess,
}: UseFormOptions<TData, TResult>) => {
  const [formData, setFormData] = useState(() => initialData);
  const [errors, setErrors] = useState<ApiErrorResponse['error'] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // send request to api
  const handleSubmit: React.SubmitEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await submitFn(formData);
      onSuccess?.(result);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          setErrors(err.errors);
          return;
        }
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { formData, errors, loading, handleChange, handleSubmit };
};
