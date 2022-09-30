<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'about'
    }
  },
  methods: {
    // getmsg () {
    //   this.$axios.get('/api/personal?name=MUKI').then(function (res) {
    //     console.log('res=', res)
    //   })
    // },
    // postmsg () {
    //   this.$axios.post('/api/favorite', {name: 'money'}).then(res => {
    //     console.log('post res = ', res)
    //   })
    // }
  }
}
</script>
