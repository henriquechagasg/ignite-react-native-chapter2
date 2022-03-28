import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
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
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  value: Yup.number()
    .typeError('Informe um valor numéerico')
    .positive('O valor não pode ser nagativo')
    .required('O valor é obrigatório'),
});

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

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const data = {
      name: form.name,
      value: form.value,
      transactionType,
      category,
    };

    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <ControlledInput
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <ControlledInput
              name="value"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.value && errors.value.message}
            />

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
    </TouchableWithoutFeedback>
  );
}
