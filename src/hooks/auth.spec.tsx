import fetchMock from 'jest-fetch-mock';
import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { act } from '@testing-library/react-native';

fetchMock.enableMocks();

const mockedUser = {
  id: 'any_id',
  email: 'john.doe@email.com',
  name: 'John Doe',
  photo: 'any_photo.png',
};

jest.mock('expo-auth-session', () => ({
  startAsync: () => ({
    type: 'success',
    params: {
      access_token: 'any_token',
    },
  }),
}));

describe('Auth Hook', () => {
  it('should be able to sign in with existing Google account', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockedUser));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => await result.current.signInWithGoogle());

    const { photo, ...userWithoutPhoto } = mockedUser;

    expect(result.current.user).toEqual(userWithoutPhoto);
  });
});
