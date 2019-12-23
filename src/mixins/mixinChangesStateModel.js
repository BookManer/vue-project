import store from '../store/modules/auth.module';

export default {
  created() {
    this.schema.fields.forEach((field) => {
      // значения по умолчанию
      this[field.name] = store.state.user[field.name];

      // наблюдаем за изменениями полей формы
      this.$watch(`$data.${field.name}`, (newValue) => {
        if (store.state.user[field.name] !== newValue) {
          this.isChanged = true;
        } else { this.isChanged = false; }
      }, { deep: true });
    });
  },
};
