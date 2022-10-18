<template>
  <div class="container row justify-content-center text-light">

    {{userName}}
    {{password}}
    {{email}}
    {{createdAt}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      email: '',
      createdAt: '',
      show: true
    }
  },
  created: function () {
    let self = this
    this.$axios.post('/api/user')
      .then(function (res) {
        self.userName = res.data.userName
        self.password = res.data.password
        self.email = res.data.email
        self.createdAt = res.data.createdAt
      })
      .catch(function () {
        localStorage.removeItem('Authorization')
        self.$router.push({path: '/login'})
      })
  },
  methods: {
    getmsg () {
      this.$axios.get('/api/test/user').then(function (res) {
        console.log('res=', res)
      })
    }
  }
}
</script>
