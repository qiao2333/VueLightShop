<style scoped>
	.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
<template>
	<div  class="layout">
		<Sider v-if="hasload" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
			<MenuItem to="/controller/person" name="header">
			<div v-if="headload">
				<Row>
					<Col span="12">
					<Picture :myStyle="''" :headertype="1" :type="'user'" :path="userHeader" />
					</Col>
					<Col offset="6" span="6">
					{{userName}}
					</Col>
				</Row>
			</div>
			</MenuItem>
			<Menu theme="dark" width="auto">
				<Submenu v-if="userType==2" name="1">
					<template slot="title">
						<Icon type="ios-navigate"></Icon>
						管理员页面
					</template>
					<MenuItem to="/controller/addLight" name="1-1">添加灯饰</MenuItem>
					<MenuItem to="/controller/addUser" name="1-2">添加用户</MenuItem>
					<MenuItem to="/controller/controllerOrder" name="1-3">订单管理</MenuItem>
					<MenuItem to="/controller/controllerUser" name="1-4">用户管理</MenuItem>
					<MenuItem to="/controller/controllerLight" name="1-5">灯饰管理</MenuItem>
				</Submenu>
				<Submenu v-else-if="userType==1" name="2">
					<template slot="title">
						<Icon type="ios-keypad"></Icon>
						雇员页面
					</template>
					<MenuItem to="/controller/employeeOrder" name="2-1">雇员订单管理页面</MenuItem>
				</Submenu>
			</Menu>
		</Sider>
		<Layout :style="{marginLeft: '200px'}">
			<Header style="background-color: white;"></Header>
			<keep-alive :exclude="/UnKeep$/">
				<routerView @tip="tip"></routerView>
			</keep-alive>
			</Content>
		</Layout>
	</div>
</template>
<script>
	import Picture from '@/pages/components/Picture'
	export default {
		name: 'Controller',
		data() {
			return {
				userHeader: null,
				userName: null,
				headload: false,
				userType:1,
				hasload:false
			}
		},
		components: {
			Picture
		},
		mounted(){
			this.getUserInfo()
		},
		methods: {
			imageload() {
				this.userHeader = this.$store.getters.getHeader
				this.userName = this.$store.getters.getUserName
				this.userType = this.$store.getters.getType
				if (this.userType == 0){
					this.$router.push("/home/light")
				}
				this.headload = true
				this.hasload = true
			},
			async getUserInfo() {
				if (this.$store.getters.getUserName == "") {
					await this.$axios.get("/user/getUserInfo").then(async (res) => {
						const data = res.data.datas
						if (res.data.code == -1) {
							await this.$store.commit('login', {
								userName: "",
								userType: 0,
								userHeader: "",
								userId: 0
							})
						} else {
							await this.$store.commit('login', {
								userName: data.userName,
								userType: data.userType,
								userHeader: data.path,
								userId: data.code
							})

						}
						this.imageload()
					}).catch((err) => {
						console.log(err)
					})
				}else{
					this.imageload()
				}
			},
			tip(data) {
				switch (data.type) {
					case "error":
						{
							this.$Notice.error({
								title: "错误",
								desc: data.text
							})
						};
						break;
					case "success":
						{
							this.$Notice.success({
								title: "成功",
								desc: data.text
							})
						};
						break;
					case "info":
						{
							this.$Notice.info({
								title: "消息",
								desc: data.text
							})
						};
						break;
					case "warning":
						{
							this.$Notice.warning({
								title: "警告",
								desc: data.text
							})
						};
						break;
				}

			}
		},
	}
</script>
