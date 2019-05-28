<template>
  <div>
    <form @submit.prevent="handleSubmit()">
      用户名：<input v-model="formItem.userName"
             name="userName" />
      密码：<input v-model="formItem.password"
             name="password" />
      <button type="submit">提交</button>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formItem: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      this.$axios.post('/user/login', this.$qs.stringify({
        userName: this.formItem.userName,
        password: this.formItem.password
      })).then(async (res) => {
        const data = res.data.datas[0]
				var header = ''
				if(data.path == ""){
					header = '@/assets/dog.jpg'
				}else{
					header = await  (async()=>{
						var img
						await this.$axios.get('/assets/user/' + data.path,{responseType: "arraybuffer"}).then((res)=>{
							var imagedata = res.data
							img = 'data:image/png;base64,' + btoa (new Uint8Array(imagedata).reduce( (imagedata, byte) => imagedata + String.fromCharCode(byte), ''))
						}).catch((err)=>{
							console.log(err)
						})
						return img
					})()
				}
        this.$store.commit('login', { userName: data.user_name, userType: data.user_type, userHeader:header, userId: data.code })
        if (res.data.login == true) {
          this.$router.push('/home');
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },

}
</script>
<style>
</style>
