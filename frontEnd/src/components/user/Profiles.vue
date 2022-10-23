<template>
  <b-container class="bv-example-row mt-3 profile-main">
  <div v-if="!show" class="text-center">
    <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
  </div>
  <b-row v-else>
    <b-col cols="6" class="profile-child p-3" md="4">
      <b-img v-if="mainImg" :src="mainImg" rounded="circle" alt="Not rounded image"></b-img>
      <b-img v-else src="" rounded="circle" alt="Not rounded image"></b-img>
    </b-col>
    <b-col cols="12" class="profile-child" md="8">cols="12" md="8"</b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: '',
      email: '',
      createdAt: '',
      mainImg: 'https://picsum.photos/125/125/?image=58',
      show: false
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
        self.show = true
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
