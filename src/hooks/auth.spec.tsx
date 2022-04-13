import { startAsync } from 'expo-auth-session';
import { AuthProvider, useAuth } from './auth';

import fetchMock from 'jest-fetch-mock';
import { mocked } from 'jest-mock';
import { act } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';

import AsyncStorage from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

const mockedUser = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png',
};

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  let startAsyncMocked: any;

  beforeEach(async () => {
    startAsyncMocked = mocked(startAsync as any);

    const userCollectionKey = '@gofinances:user';
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it('should be able to sign in with existing Google account', async () => {
    startAsyncMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify(mockedUser));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    const { photo, ...userWithoutPhoto } = mockedUser;

    expect(result.current.user).toEqual(userWithoutPhoto);
  });

  it('should not have an user with id if Google authentication is cancelled', async () => {
    startAsyncMocked.mockReturnValue({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
