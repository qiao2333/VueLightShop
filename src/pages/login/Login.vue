<template>
	<div>
		<div style="height:900px;background-color: #13C2C2;">
			<Row style="padding-top: 100px;">
				<Col span="8" offset="8" style="padding: 50px; background-color: white;">
				<h1>灯饰商城登录页面</h1>
				<Form style="padding-top: 50px;">
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
						<Button to="/regist" type="default">注册</Button>
					</FormItem>
				</Form>
				</Col>
			</Row>

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
				})).then(async (res) => {
					const data = res.data.datas[0]
					console.log(data)
					this.$store.commit('login', {
						userName: data.user_name,
						userType: data.user_type,
						userHeader: data.path,
						userId: data.code
					})
					if (res.data.login == true) {
							
						if (data.user_type == 0){
							this.$router.push('/home/light');
						}else{
							this.$router.push('/controller');
						}
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
