<template>
    <div class="login-main row justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <h1 class="text-light">Login</h1>
        <b-form-group id="input-group-1" class="text-left" label-for="input-1">
          <b-form-input id="input-1" v-model="form.userName" type="text" placeholder="Enter userName" required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" class="text-left" label-for="input-2">
          <b-form-input id="input-2" type="password" v-model="form.password" placeholder="Enter password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">登入</b-button>
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
        password: ''
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
      this.$axios.post('/api/auth/signin', this.form)
        .then(function (res) {
          localStorage.setItem('Authorization', res)
          self.$router.push({path: '/home'})
        })
        .catch(function (error) {
          self.modal('登入失敗', error.response.data.message)
        })
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.userName = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
