import * as yup from 'yup';

export default yup.object().shape({
  images: yup
    .array()
    .nullable()
    .required('Deve conter pelo menos duas imagens')
    .min(2, 'Deve conter pelo menos duas imagens')
    .max(3, 'Suporte máximo para 3 imagens'),
  name: yup.string().required('Campo nome do produto é obrigatório'),
  price: yup.number().required('Campo preço é obrigatório'),
  quantity: yup.number().required('Campo quantidade é obrigatório'),
  short_description: yup
    .string()
    .required('Campo descrição curta é obrigatório'),
  description: yup.string().required('Campo descrição é obrigatório'),
});
