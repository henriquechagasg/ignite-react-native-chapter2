import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { Button } from '../../components/Forms/Button';
import { ControlledInput } from '../../components/Forms/ControlledInput';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Category, CategorySelect } from '../CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

export interface FormData {
  name: string;
  value: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState<
    'income' | 'outcome' | ''
  >('');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [category, setCategory] = useState<Category>({
    key: 'category',
    name: 'Categoria',
    icon: 'any',
  });

  const { control, handleSubmit } = useForm();

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalVisible(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalVisible(false);
  }

  function handleSelectCategory(category: Category) {
    setCategory(category);
  }

  const handleRegister = (form: any) => {
    const data = {
      name: form.name,
      value: form.value,
      transactionType,
      category,
    };

    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <ControlledInput name="name" control={control} placeholder="Nome" />

          <ControlledInput name="value" control={control} placeholder="Valor" />

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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
      </Form>

      <Modal visible={categoryModalVisible}>
        <CategorySelect
          category={category}
          setCategory={handleSelectCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
