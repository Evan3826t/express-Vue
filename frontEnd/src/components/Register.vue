<template>
  <div class="login-main row justify-content-center">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <h1 class="text-light">Register</h1>
      <b-form-group id="input-group-1" class="text-left" label-for="input-1">
        <b-form-input id="input-1" v-model="form.userName" type="text" placeholder="Enter user name" required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" class="text-left" label-for="input-2">
        <b-form-input id="input-2" type="password" v-model="form.password" placeholder="Enter password" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" class="text-left" label-for="input-3">
        <b-form-input id="input-3" type="password" v-model="form.checkPassword" placeholder="Check password" required></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" class="text-left" label-for="input-4">
        <b-form-input id="input-4" v-model="form.email" type="email" placeholder="Enter email" required>
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">創立</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        userName: '',
        password: '',
        email: '',
        checkPassword: ''
      },
      show: true
    }
  },
  methods: {
    modal (title, contnet) {
      this.$parent.modalToggle(title, contnet)
    },
    onSubmit (event) {
      event.preventDefault()
      let self = this
      if (this.form.password !== this.form.checkPassword) {
        self.modal('錯誤', '兩次輸入的密碼不同')
      } else {
        this.$axios.post('/api/auth/signup', this.form)
          .then(function (res) {
            localStorage.setItem('Authorization', res)
            this.$router.push({path: '/home'})
          })
          .catch(function (error) {
            self.modal('註冊失敗', error.response.data.message)
          })
      }
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.userName = ''
      this.form.password = ''
      this.form.email = ''
      this.form.checkPassword = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
