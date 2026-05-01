import { redirect, type LoaderFunction } from 'react-router';
import { getUser } from '../../api/auth';
import { ApiError } from '../../api/error';

// loader for protected routes
export const authLoader: LoaderFunction = async () => {
  try {
    const user = await getUser();
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        throw redirect('/login');
      }
    }

    throw error;
  }
};
