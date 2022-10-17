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

        <b-button type="submit" variant="primary">登入</b-button>
        <b-button type="reset" variant="danger">重置</b-button>
      </b-form>
    </div>
    <button type="button" name="button" v-on:click="getmsg">get</button>
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
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      this.$axios.post('/api/auth/signin', this.form)
        .then(function (res) {
          localStorage.setItem('Authorization', res)
          this.$router.push({path: '/home'})
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
