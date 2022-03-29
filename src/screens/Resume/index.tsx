import { HistoryCard } from '../../components/HistoryCard';
import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  ResumeContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LaodingContainer,
} from './styles';

import { VictoryPie } from 'victory-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [categoriesResume, setCategoriesResume] = useState([] as any[]);

  const theme = useTheme();

  function handleChangeDate(action: 'next' | 'prev') {
    return action === 'next'
      ? setSelectedDate(addMonths(selectedDate, 1))
      : setSelectedDate(addMonths(selectedDate, -1));
  }

  async function loadTransactions() {
    setIsLoading(true);

    const dataKey = '@gofinance:transactions';
    const transactionsString = await AsyncStorage.getItem(dataKey);
    const transactions = transactionsString
      ? (JSON.parse(transactionsString) as DataListProps[])
      : [];

    const outcomes = transactions.filter(
      (transaction) =>
        transaction.type === 'outcome' &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear()
    );

    function getCategoriesResume() {
      return categories
        .map((category) => {
          const total = outcomes
            .map((outcome) =>
              outcome.category === category.key ? Number(outcome.value) : 0
            )
            .reduce((acc, curr) => acc + curr, 0);

          const formattedTotal = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          return {
            name: category.name,
            total: total > 0 && total,
            formattedTotal,
            color: category.color,
          };
        })
        .filter((resume) => resume.total);
    }

    setCategoriesResume(getCategoriesResume());
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo de cadastros</Title>
      </Header>
      {isLoading ? (
        <LaodingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LaodingContainer>
      ) : (
        <Content>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate('prev')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleChangeDate('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={categoriesResume.map((resume) => {
                return { x: resume.name, y: resume.total };
              })}
              colorScale={categoriesResume.map((resume) => resume.color)}
              style={{
                labels: {
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
            />
          </ChartContainer>

          <ResumeContainer
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom:
                categoriesResume.length > 2 ? useBottomTabBarHeight() : 0,
            }}
          >
            {categoriesResume.map((resume, i) => (
              <HistoryCard
                key={i}
                title={resume.name}
                amount={resume.formattedTotal}
                color={resume.color}
              ></HistoryCard>
            ))}
          </ResumeContainer>
        </Content>
      )}
    </Container>
  );
}
