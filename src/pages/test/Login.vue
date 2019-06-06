<template>
	<div style="height: 1000px;width: 1200px;text-align: center;">
		<div style="text-align: center;height: 1000px;width: 1000px;padding-left: 500px;padding-top: 300px;">
			<Form >
				<FormItem>
            <Input type="text" v-model="formItem.userName" name="userName" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Input type="password" v-model="formItem.password" name="password" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
				<FormItem>
            <Button type="primary" @click="handleSubmit()">登陆</Button>
            <Button type="default">注册</Button>
        </FormItem>
			</Form>
		</div>
		
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formItem: {
					userName: '',
					password: ''
				}
			}
		},
		methods: {
			
			async handleSubmit() {
				this.$axios.post('/user/login', this.$qs.stringify({
					userName: this.formItem.userName,
					password: this.formItem.password
				})).then(async(res) => {
					const data = res.data.datas[0]
					var header = ''
					if(data.path == "") {
						header = '@/assets/dog.jpg'
					} else {
						header = await (async() => {
							var img
							await this.$axios.get('/assets/user/' + data.path, {
								responseType: "arraybuffer"
							}).then((res) => {
								var imagedata = res.data
								img = 'data:image/png;base64,' + btoa(new Uint8Array(imagedata).reduce((imagedata, byte) => imagedata + String.fromCharCode(byte), ''))
							}).catch((err) => {
								console.log(err)
							})
							return img
						})()
					}
					this.$store.commit('login', {
						userName: data.user_name,
						userType: data.user_type,
						userHeader: header,
						userId: data.code
					})
					if(res.data.login == true) {
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
	
	