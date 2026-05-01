import { type LoaderFunction } from 'react-router';
import { getUser } from '../../api/user';
import { ApiError } from '../../api/error';

export const rootLoader: LoaderFunction = async () => {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) return null;
    }

    throw error;
  }
};
