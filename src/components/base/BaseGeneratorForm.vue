<template>
  <form @submit.prevent="onSubmit">
    <div v-for="(field, index) in schema.fields" :key="index">
      <v-text-field v-model="$v[field.name].$model"
                    :label="field.label"
                    :type="field.type"/>
      <span v-if="$v[field.name].$error">
        {{ field.error | t_errors }}
      </span>
    </div>
    <v-btn type="submit"
           class="primary mt-4 d-block ml-auto mr-auto"
           :disabled="$v.$invalid">
      {{ schema.submitName }}
    </v-btn>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'BaseGeneratorForm',
  props: ['schema', 'type', 'validate_model', 'value'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    };
  },
  validations: {
    name: {
      required,
      valid: value => value.trim().split(' ').length === 3,
    },
    email: { required, email },
    password: { required },
    repeatPassword: { required, valid: (value, model) => model.password === value },
  },
  methods: {
    onSubmit() {
      const { name, password } = this;
      this.$emit('submitForm', { email: this.email, name, password });
    },
  },
};
</script>

<style scoped>

</style>
