import { act, fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Register } from '.';
import theme from '../../global/styles/theme';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
  };
});

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Register Screen', () => {
  it('should open category modal when user click on category button', async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers,
    });

    const categoryModal = getByTestId('category.modal');

    const openModalButton = getByTestId('open-modal.button');

    await act(async () => {
      await fireEvent.press(openModalButton);
    });

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
