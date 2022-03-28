import { TouchableOpacityProps } from 'react-native';
import { Container, Category, Icon } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export function CategorySelect({ title, ...rest }: Props) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}