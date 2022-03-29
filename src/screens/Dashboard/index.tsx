import React, { useCallback, useEffect, useState } from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionDataProps,
  TransactionsCard,
} from '../../components/TransactionsCard';

import {
  Container,
  Header,
  UserInfoWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LaodingContainer,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionDataProps {
  id: string;
}

interface HighlightProps {
  value: string;
  lastTransaction?: string;
}

interface HighlightData {
  incomes: HighlightProps;
  outcomes: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const [transactions, setTransactions] = useState<DataListProps[]>(
    [] as DataListProps[]
  );

  const [highlighData, setHighlighData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  function getLastTransactionFormatted(
    transactions: DataListProps[],
    type: 'income' | 'outcome'
  ) {
    const date = new Date(
      Math.max.apply(
        Math,
        transactions
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${date.getDate()} de ${date.toLocaleString('pt-BR', {
      month: 'long',
    })}`;
  }

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions';
    const transactionsString = await AsyncStorage.getItem(dataKey);
    const transactions = transactionsString
      ? (JSON.parse(transactionsString) as DataListProps[])
      : [];

    let incomesTotal = 0;

    let outcomesTotal = 0;

    const formattedTransactions = transactions.map((transaction) => {
      if (transaction.type === 'income') {
        incomesTotal += Number(transaction.value);
      } else {
        outcomesTotal += Number(transaction.value);
      }

      const value = Number(transaction.value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(transaction.date));

      return {
        ...transaction,
        date,
        value,
      };
    });

    setTransactions(formattedTransactions);

    const incomeLastTransactionFormatted = getLastTransactionFormatted(
      transactions,
      'income'
    );

    const outcomeLastTransactionFormatted = getLastTransactionFormatted(
      transactions,
      'outcome'
    );

    const totalInterval = `01 à ${outcomeLastTransactionFormatted}`;

    setHighlighData({
      incomes: {
        value: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${incomeLastTransactionFormatted}.`,
      },
      outcomes: {
        value: outcomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${outcomeLastTransactionFormatted}.`,
      },
      total: {
        value: (incomesTotal - outcomesTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LaodingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LaodingContainer>
      ) : (
        <>
          <Header>
            <UserInfoWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/69800139?v=4',
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Henrique</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserInfoWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              value={highlighData.incomes.value}
              lastTransaction={highlighData.incomes.lastTransaction!}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              value={highlighData.outcomes.value}
              lastTransaction={highlighData.outcomes.lastTransaction!}
            />
            <HighlightCard
              type="total"
              title="Total"
              value={highlighData.total.value}
              lastTransaction={highlighData.total.lastTransaction!}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionsCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
