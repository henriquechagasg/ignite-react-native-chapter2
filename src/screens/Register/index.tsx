import { useState } from 'react';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState<
    'income' | 'outcome' | ''
  >('');

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              type="income"
              isActive={transactionType === 'income'}
              onPress={() => handleTransactionTypeSelect('income')}
            >
              Income
            </TransactionTypeButton>
            <TransactionTypeButton
              type="outcome"
              isActive={transactionType === 'outcome'}
              onPress={() => handleTransactionTypeSelect('outcome')}
            >
              Outcome
            </TransactionTypeButton>
          </TransactionTypes>
        </Fields>
        <Button>Enviar</Button>
      </Form>
    </Container>
  );
}
