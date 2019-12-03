export default {
  methods: {
    validFIO(value) {
      return value.trim().split(' ').length === 3;
    },
    validRepeatPassword(value, model) {
      return model.password === value;
    },
  },
};
