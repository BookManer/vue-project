<template>
  <form class="wrappField"
        @submit.prevent="onSubmit">
    <div v-for="(field, index) in fields"
         :key="index">
      <component :is="field.component"
                 :label="field.label"
                 :type="field.type"
                 v-model="$v[field.name].$model"
                 v-bind="field.additionalProps">
      </component>
      <span v-if="$v[field.name].$error">
        {{ field.error | t_errors }}
      </span>
    </div>
    <v-item-group class="d-flex row">
      <v-btn type="submit"
             class="primary mt-4 d-block ml-auto mr-auto"
             :disabled="$v.$invalid || !isChanged">
        {{ schema.submitName }}
      </v-btn>
      <v-btn text
             class="red--text mt-4 d-block ml-auto mr-auto"
             :disabled="!isChanged"
             @click="onReset">
        отмена
      </v-btn>
    </v-item-group>
  </form>
</template>

<script>
import Vue from 'vue';
import VTextField from 'vuetify/lib/components/VTextField/index';
import VFileInput from 'vuetify/lib/components/VFileInput/index';
import VTextarea from 'vuetify/lib/components/VTextarea/index';
import { required, email } from 'vuelidate/lib/validators';
import store from '../../store/modules/auth.module';

import mixinChangesStateModel from '../../mixins/mixinChangesStateModel';

export default {
  name: 'BaseGeneratorForm',
  mixins: [mixinChangesStateModel],
  props: ['schema', 'type', 'value'],
  data() {
    return {
      displayName: '',
      aboutMe: '',
      password: '',
      email: '',
      repeatPassword: '',
      photoURL: null,
      isChanged: false,
    };
  },
  created() {
    // отменяем валидацию на неиспользуемые поля
    Object.keys(this.$data).filter((modelProp) => {
      const nameFields = this.schema.fields.map(field => field.name);
      return !nameFields.includes(modelProp);
    })
      .forEach((deletedProp) => {
        Vue.set(this.$data, deletedProp, null);
        if (deletedProp !== 'isChanged') {
          Vue.delete(this.$v[deletedProp], '$invalid');
        }
      });
  },
  validations: {
    aboutMe: {
      required,
    },
    photoURL: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
    },
    repeatPassword: {
      required,
      valid: (value, model) => model.password === value,
    },
    displayName: {
      required,
      valid: value => value.trim().split(' ').length === 3,
    },
  },
  computed: {
    fields() {
      return this.schema.fields;
    },
  },
  methods: {
    onSubmit() {
      const {
        displayName, password, photoURL, aboutMe,
      } = this;

      this.$emit('submitForm', {
        email: this.email,
        displayName,
        password,
        photoURL,
        aboutMe,
      });
    },
    onReset() {
      this.schema.fields.forEach((field) => {
        this[field.name] = store.state.user[field.name];
      });
    },
  },
  components: {
    VTextField,
    VFileInput,
    VTextarea,
  },
};
</script>

<style lang="scss">
.wrappField {
  min-width: 320px;
  max-width: 960px;
}
</style>
