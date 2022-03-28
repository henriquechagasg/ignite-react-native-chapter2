import { Feather } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerProps extends TouchableOpacityProps {
  isActive: boolean;
  type: 'income' | 'outcome';
}

interface IconProps {
  type: 'income' | 'outcome';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};

  ${({ isActive }) =>
    isActive &&
    css`
      border: none;
    `}

  border-radius: 5px;
  padding: 16px;

  ${({ isActive, type }) =>
    isActive &&
    type === 'income' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === 'outcome' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;

  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
