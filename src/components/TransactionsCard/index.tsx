import React from 'react';
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface CategoryProps {
  name: string;
  icon: string;
}

export interface TransactionDataProps {
  type: 'income' | 'outcome';
  title: string;
  value: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionDataProps;
}

export function TransactionsCard({ data }: Props) {
  const [category] = categories.filter(
    (category) => category.key === data.category
  );

  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.value}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
