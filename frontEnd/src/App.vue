<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="./home">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <template v-if="!token">
                <b-dropdown-item href="/login">Sign In</b-dropdown-item>
                <b-dropdown-item href="/register">Register</b-dropdown-item>
              </template>
              <template v-else>
                <b-dropdown-item href="/profiles">Profile</b-dropdown-item>
                <b-dropdown-item href="#" v-on:click="SignOut">Sign Out</b-dropdown-item>
              </template>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
    <!-- modal -->
    <b-modal ref="my-modal" hide-footer :title="modalTitle">
      <div class="d-block text-center">
        <h3>{{ modalContent }}</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">關閉</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      get token () {
        return localStorage.getItem('Authorization') || 0
      },
      modalTitle: 'title',
      modalContent: 'content',
      modalUrl: null
    }
  },
  methods: {
    SignOut () {
      localStorage.removeItem('Authorization')
      this.$router.push({ path: '/login' })
    },
    modalToggle (title, content, url = null) {
      this.modalTitle = title
      this.modalContent = content
      this.modalUrl = url
      this.$refs['my-modal'].show()
    },
    hideModal () {
      if (this.modalUrl) {
        this.$router.push({path: this.modalUrl})
      }
      this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
