<template>
	<div style="width: auto;padding-left: 400px;">
		<Menu mode="horizontal" theme="dark" active-name="1" @on-select="handleSelect">
			<MenuItem name="light">
				<Icon type="ios-home-outline" size="24"/>主页
			</MenuItem>
			<MenuItem name="buycar">
				<Icon type="ios-cart-outline" size="24" />我的购物车
			</MenuItem>
			<MenuItem name="order">
				<Icon type="ios-bulb-outline" size="24" />我的订单
			</MenuItem>
			<MenuItem name="collection">
				<Icon type="ios-star-outline" size="24" />收藏夹
			</MenuItem>
			<MenuItem name="person">
				<div v-if="headload">
					<Row>
						<Col span="12">
							<Picture :myStyle="''" :headertype="1" :type="'user'" :path="userHeader"/>
						</Col>
						<Col offset="6" span="6">
							{{userName}}
						</Col>
					</Row>
				</div>
			</MenuItem>
		</Menu>
	</div>
</template>
<script>
	import Picture from '@/pages/components/Picture'
	export default {
		components: {
			Picture
		},
		data() {
			return {
			
				userHeader:null,
				userName:null,	
				headload:false
			}
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
			handleSelect(name) {
				this.$router.push('/home/' + name);
			},
			imageload(){
				this.userHeader = this.$store.getters.getHeader
				this.userName = this.$store.getters.getUserName
				console.log(this.userHeader)
				this.headload=true
			},
			async getUserInfo() {
				if (this.$store.getters.getUserName == "") {
					await this.$axios.get("/user/getUserInfo").then( async(res) => {
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
				}
			}
		},
	}
</script>
<style>

</style>