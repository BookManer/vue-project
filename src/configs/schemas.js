import { required, email } from 'vuelidate/lib/validators';

export default {
  forms: {
    formSignUp: {
      fields: [
        {
          name: 'email',
          label: 'Почта',
          rules: {
            required,
            email,
          },
        }, {
          name: 'name',
          label: 'ФИО',
          rules: {
            required,
            valid: value => value.trim().split(' ').length === 3,
          },
        }, {
          name: 'password',
          label: 'Пароль',
          rules: {
            required,
          },
        }, {
          name: 'repeatPassword',
          label: 'Подтвердить пароль',
          rules: {
            required,
            valid: (value, model) => model.password === value,
          },
        },
      ],
      submitName: 'Зарегестрироваться',
    },
  },
};
