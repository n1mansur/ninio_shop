import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import { Box, Button, Heading, Input, Text, useToast } from '@chakra-ui/react';
import Logo from '@/components/UI/Logo'
import Container from '@/components/UI/Container'
import { ArrowLeftIcon } from '@/components/svg';
import Card from './CheckoutCard';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CheckIcon } from '@chakra-ui/icons';
import Maps from './Maps';
import { invokeFunction } from '@/services/invokeFunctionService.js'
import axios from 'axios';

export default function CheckoutPage() {
  const toast = useToast()
  const [addressInfo, setAddressInfo] = useState(null);
  const router = useRouter()
  const productsId = []
  const { products: queryData = [] } = router.query;
  const products = queryData.length > 0 ? JSON.parse(decodeURIComponent(queryData)) : []
  const initVal = 0
  const sumWithInitial = products.length > 0 ? products?.reduce((acc, value) => acc + value.sell_price, initVal) : ''
  const initialValues = {
    full_name: '',
    phone_number: '',
    telegram_nickname: '',
    instagram_nickname: '',
    address_info: '',
    total_price: '',
    payment_type: '',
    ordered_products: [],
  }
  const validate = (values) => {
    const errors = {};
    if (!values.full_name) {
      errors.full_name = 'Поле обязательно для заполнения'
    }
    if (!values.phone_number) {
      errors.phone_number = 'Поле обязательно для заполнения'
    }
    if (!values.address_info) {
      errors.address_info = 'Напишите дополнительную информацию о местоположении'
    }
    if (!values.payment_type) {
      errors.payment_type = 'Укажите тип оплаты'
    }
    return errors
  }

  products?.map(obj => productsId.push({ guid: obj.guid, quantity: obj?.quantity }))

  const goBack = () => {
    history.go(-1)
  }
  //console.log(addressInfo);
  const formattedNumber = sumWithInitial?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  //console.log(addressInfo, 'addressInfo');
  const onSubmit = (values) => {
    if (!addressInfo) {
      toast({
        position: 'top',
        title: 'Укажите адрес!',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
      
    } else {
      //console.log(
      //  Object.assign({}, values, {
      //    total_price: sumWithInitial,
      //    ordered_products: [...productsId],
      //    address_info: addressInfo.request,
      //    address_latlong: addressInfo.resultCoordinates,
      //  })
      //);
      invokeFunction.post(
        Object.assign({}, values, {
          total_price: sumWithInitial,
          ordered_products: [...productsId],
          address_info: addressInfo.request,
          address_latlong: addressInfo.resultCoordinates,
        }))
    toast({
      title: 'Отправляем...',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }

}

return (
  <Box className={styles.checkoutPage}>
    <Container padding={'0 37px'}>
      <Box className={styles.header}>
        <Button className={styles.goBack} onClick={() => goBack()} color={'#5B6871'}>
          <ArrowLeftIcon />
          Назад
        </Button>
        <Box className={styles.logo}>
          <Logo />
        </Box>
      </Box>
    </Container>
    <Box className={styles.body}>
      <Container>
        <Heading className={styles.heading}>
          Оформление заказа
        </Heading>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values) => onSubmit(values)}
        >
          {props => (
            <Form className={styles.form}>
              <Box className={styles.yourInfo}>
                <Heading className={styles.heading}>Ваши данные</Heading>
                <Box className={styles.inputs}>
                  <label className={styles.label}>
                    ФИО
                    <Field
                      type="text"
                      id='full_name'
                      name='full_name'
                      className={styles.labelInp}
                    />
                    <ErrorMessage className={styles.errorMessage} name="full_name" component="div" />
                  </label>
                  <label className={styles.label}>
                    Номер телефона
                    <Field
                      type="number"
                      id='phone_number'
                      name='phone_number'
                      className={styles.labelInp} />
                    <ErrorMessage className={styles.errorMessage} name="phone_number" component="div" />
                  </label>
                </Box>
                <Box className={styles.inputs}>
                  <label className={styles.label}>
                    Телеграм ник
                    <Field
                      type="text"
                      id='telegram_nickname'
                      name='telegram_nickname'
                      className={styles.labelInp} />
                  </label>
                  <label className={styles.label}>
                    Инстаграм ник
                    <Field
                      type="text"
                      id='instagram_nickname'
                      name='instagram_nickname'
                      className={styles.labelInp} />
                  </label>
                </Box>
                <Box className={styles.inputs}>
                  <label className={styles.label}>
                      Дополнительная информммация о месте доставки
                      <Field
                        type="text"
                        id='address_info'
                        name='address_info'
                        placeholder="Наприммер: Ташкент, курганский-район, дом 22... "
                        className={styles.labelInp} />
                    <ErrorMessage className={styles.errorMessage} name="address_info" component="div" />
                    </label>
                  <Box className={styles.typePayment}>
                    <Text>
                      Тип оплаты
                    </Text>
                    <Box className={styles.typePaymentSection}>
                      <label className={props.values.payment_type === 'картой' ? styles.active : ''}>
                        карта
                        {
                          props.values.payment_type === 'картой'
                          && <Box className={styles.radioIcon}>
                            <CheckIcon />
                          </Box>
                        }
                        <Field
                          type="radio"
                          id='payment_type'
                          name='payment_type'
                          value='картой'
                          className={styles.labelInp} />
                      </label>
                      <label className={props.values.payment_type === 'наличными' ? styles.active : ''}>
                        Наличными
                        {
                          props.values.payment_type === 'наличными'
                          && <Box className={styles.radioIcon}>
                            <CheckIcon />
                          </Box>
                        }
                        <Field
                          type="radio"
                          id='payment_type'
                          name='payment_type'
                          value='наличными'
                          className={styles.labelInp} />
                      </label>
                    </Box>
                    <ErrorMessage className={styles.errorMessage} name="payment_type" component="div" />
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box className={styles.sumPrice}>
                  <Heading className={styles.heading}>
                    Сумма заказа
                  </Heading>
                  <Text>Стоимость товаров: {formattedNumber} сум</Text>
                </Box>
                <Button type='submit' className={styles.confirmBtn}>Подтвердить заказ</Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Box mb={'24px'}>
          <Maps setAddressInfo={setAddressInfo} />
        </Box>
        {products && <Box className={styles.yourOrders}>
          <Heading className={styles.heading}>Ваш заказ</Heading>
          {products.map(el => (
            <Card el={el} key={el.guid} />
          ))}
        </Box>}
      </Container>
    </Box>
  </Box>
)
}
