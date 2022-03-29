import { Container, Title } from './styles';
import { ReactNode } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

interface Props extends RectButtonProps {
  children: ReactNode;
  onPress: () => void;
}

export function Button({ onPress, children, ...rest }: Props) {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
