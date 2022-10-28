<template>
  <div class="login-main row justify-content-center p-3">
    <b-form-file
      v-model="file"
      :state="Boolean(file)"
      placeholder="請上傳檔案"
    >
  </b-form-file>
  <button type="submit" class="btn-info" v-on:click="uploadFile">上傳</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      file: null,
      show: true
    }
  },
  methods: {
    modal (title, contnet) {
      this.$parent.modalToggle(title, contnet)
    },
    uploadFile () {
      let self = this
      if (this.file) {
        let formData = new FormData()
        formData.append('file', this.file)
        formData.append('type', 'profile')
        this.$axios.post('/api/file/upload', formData)
          .then(function (res) {
            console.log(res)
          })
          .catch(function (error) {
            self.modal('上傳檔案失敗', error.response.data.message)
          })
      } else {
        self.modal('錯誤', '請上傳檔案')
      }
    }
  }
}
</script>
