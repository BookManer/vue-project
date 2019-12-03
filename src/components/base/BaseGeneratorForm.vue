<template>
  <form @submit.prevent="$emmit('submit')">
    <div v-for="(fields, index) in schema" :key="index">
      <v-text-field v-model="$v[fields[index].name].$model"
                    :label="fields[index].label" />
      <span v-if="$v[fields[index].name].$error">
        {{ fields[index].error | t_errors }}
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
import Vue from 'vue';

export default {
  name: 'BaseGeneratorForm',
  props: ['schema', 'type', 'validate_model', 'value'],
  data() {
    return {
      form: {},
    };
  },
  created() {
    this.schema.fields.forEach((field) => {
      Vue.set(this.form, field.name, '');
      Vue.set(this.$v, this.$v[field.name], field.rules);
    });
  },
  validations: {
    name: {},
    email: {},
    password: {},
    repeatPassword: {},
  },
};
</script>

<style scoped>

</style>
