import { required, email } from 'vuelidate/lib/validators';

export default {
  forms: {
    formSignUp: {
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Почта',
          error: 'invalid-format:email',
          rules: [{
            nameProp: 'required',
            validator: required,
          }, {
            nameProp: 'email',
            validator: email,
          }],
        }, {
          name: 'name',
          label: 'ФИО',
          type: 'text',
          error: 'invalid-format:fio',
          rules: [{
            nameProp: 'required',
            validator: required,
          }, {
            nameProp: 'valid',
            validator: value => value.trim().split(' ').length === 3,
          }],
        }, {
          name: 'password',
          label: 'Пароль',
          type: 'password',
          rules: [{
            nameProp: 'required',
            validator: required,
          }],
        }, {
          name: 'repeatPassword',
          label: 'Подтвердить пароль',
          type: 'password',
          error: 'invalid-format:repeatPassword',
          rules: [{
            nameProp: 'required',
            validator: required,
          }, {
            nameProp: 'valid',
            validator: (value, model) => model.password === value,
          }],
        },
      ],
      submitName: 'Зарегестрироваться',
    },
  },
};
