export default {
  forms: {
    formSignUp: {
      fields: [
        {
          name: 'avatarURL',
          label: 'Фотография профиля',
          error: 'invalid-format:limit_size',
          component: 'v-file-input',
          additionalProps: {
            'prepend-icon': 'fa-camera',
          },
        }, {
          name: 'email',
          type: 'email',
          label: 'Почта',
          error: 'invalid-format:email',
          component: 'v-text-field',
        }, {
          name: 'name',
          label: 'ФИО',
          type: 'text',
          error: 'invalid-format:fio',
          component: 'v-text-field',
        }, {
          name: 'password',
          label: 'Пароль',
          type: 'password',
          component: 'v-text-field',
        }, {
          name: 'repeatPassword',
          label: 'Подтвердить пароль',
          type: 'password',
          error: 'invalid-format:repeatPassword',
          component: 'v-text-field',
        },
      ],
      submitName: 'Зарегестрироваться',
    },
    formEditProfile: {
      fields: [
        {
          name: 'displayName',
          label: 'ФИО',
          type: 'text',
          error: 'invalid-format:fio',
          component: 'v-text-field',
        }, {
          name: 'email',
          label: 'Почта',
          type: 'email',
          error: 'invalid-format:email',
          component: 'v-text-field',
        }, {
          name: 'aboutMe',
          label: 'О себе',
          type: 'textarea',
          error: 'invalid-format:maxsize',
          component: 'v-textarea',
        },
      ],
      submitName: 'Применить',
    },
  },
};
