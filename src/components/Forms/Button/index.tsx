import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';
import { ReactNode } from 'react';

interface Props extends TouchableOpacityProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Title>{children}</Title>
    </Container>
  );
}
