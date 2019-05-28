<template>
	<div>
		<Spin v-if="reload" />
		<div v-else>
			<Row v-if="hasload">
				<Col offset="2" span="20">
					<Row>
						<Col span="12">
							<Card title="账号信息">
								用户名:{{user.userName}}<br />
								用户类型:{{user.userType}}<br />
							</Card>
							<LightInfo @tip="tip" :userinfo="userinfo"></LightInfo>
							<AddressInfo @tip="tip"></AddressInfo>
						</Col>
						<Col span="12">
							<Header :imagepath="path" />
						</Col>
					</Row>
				</Col>
			</Row>
			<Spin v-else  />
		</div>
	</div>
</template>
	

<script>
	import LightInfo from './components/Userinfo'
	import Header from './components/header'
	import AddressInfo from './components/addressInfo'
   export default {
	   components: {
	   	LightInfo,
		Header,
		AddressInfo
	   },
        data (){
            return {
				reload:false,
				hasload:false,
		        user:{},
				userHead:"",
				userinfo:{},
				path:"",
            }
        },
		async mounted(){
			await this.fetch()
		},
		methods: {
			async fetch() {
				await this.$axios.get('/user/getMoreInfo').then((res)=>{
					console.log(res.data.code)
					if(res.data.code == 0){
						console.log(res.data.user[0])
						const data = res.data.user[0]
						var user = new Object()
						user.userName = data.userName
						user.userType = data.userType
						this.user = user
						
						
						var userinfo = new Object()
						userinfo.userSex = data.userSex
						userinfo.userEmail = data.userEmail
						userinfo.userPhone = data.userPhone
						userinfo.userCode = data.userCode
						this.userinfo = userinfo
						console.log(this.userinfo)
						
						this.path = data.path
						this.hasload = true
					}else{
						//返回到注册页面
						this.$router.replace("/")
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
			userinfoUpdate(){
				this.$axios.post("/user/UpdateUserInfo").then((res)=>{
					const data = res.data
					if(data.code == 0){
						this.success("成功修改用户信息")
					}else{
						this.error("修改用户信息失败")
					}
				})
			},
			tip(data){
				switch (data.type){
					case "error":{
						this.$Notice.error({
							title:"错误",
							desc:data.text
						})
					};break;
					case "success":{
						this.$Notice.success({
							title:"成功",
							desc:data.text
						})
					};break;
					case "info":{
						this.$Notice.info({
							title:"消息",
							desc:data.text
						})
					};break;
					case "warning":{
						this.$Notice.warning({
							title:"警告",
							desc:data.text
						})
					};break;
				}
				
			}
		},
    }

	
   
</script>
