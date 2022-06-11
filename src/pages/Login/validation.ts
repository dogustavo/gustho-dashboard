import * as yup from 'yup';

export default yup.object().shape({
  mail: yup
    .string()
    .email('Email inválido!')
    .required('Campo email é obrigatório'),
  password: yup
    .string()
    .required('Campo senha é obrigatório')
    .min(6, 'Senha deve possuir ao menos 6 caracteres!'),
});
