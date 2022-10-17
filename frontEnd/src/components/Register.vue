<template>
  <div class="container row justify-content-center">
    <div class="login-main row justify-content-center">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" class="text-left" label="user name:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.userName" type="text" placeholder="Enter userName" required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" class="text-left" label="Password:" label-for="input-2">
          <b-form-input id="input-2" type="password" v-model="form.password" placeholder="Enter password" required></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" class="text-left" label="Email address:" label-for="input-1"
          description="We'll never share your email with anyone else.">
          <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Enter email" required>
          </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
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
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      this.$axios.post('/api/auth/signup', this.form)
        .then(function (res) {
          localStorage.setItem('Authorization', res)
          console.log('res=', res.response)
        })
        .catch(function (error) {
          console.log('ERROR ! ', error)
        })
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
    },
    getmsg () {
      this.$axios.get('/api/test/user').then(function (res) {
        console.log('res=', res)
      })
    }
  }
}
</script>
