import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './styles';

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

interface Props extends TouchableOpacityProps {
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
    <Container {...rest} isActive={isActive} type={type}>
      <Icon name={icons[type]} type={type} />
      <Title>{children}</Title>
    </Container>
  );
}
