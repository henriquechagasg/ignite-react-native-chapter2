import { ReactNode } from 'react';
import { Container, Title, Icon, Button } from './styles';
import { RectButtonProps } from 'react-native-gesture-handler';

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

interface Props extends RectButtonProps {
  type: 'income' | 'outcome';
  children: ReactNode;
  isActive: boolean;
}

export function TransactionTypeButton({
  type,
  children,
  isActive,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{children}</Title>
      </Button>
    </Container>
  );
}
