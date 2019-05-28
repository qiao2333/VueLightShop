<template>
	<div>
		<div style="height: 30px;">
			{{this.$store.getters.getUserName}}
			<Avatar :src="this.$store.getters.getHeader" />
		</div>
		<Layout>
			<Header>
				<MyHeader></MyHeader>
			</Header>
			<Content style="height:1000px;">
				<keep-alive>
					<routerView></routerView>
				</keep-alive>
			</Content>
			<Footer>
				<MyFoot></MyFoot>
			</Footer>
		</Layout>
	</div>
</template>
<script>
	import MyHeader from './components/Header'
	import MyFoot from './components/Foot'
	export default {
		data() {
			return {

			}
		},
		methods: {
			async getUserInfo() {
				if (this.$store.getters.getUserName == "") {
					await this.$axios.get("/user/getUserInfo").then( async(res) => {
						const data = res.data.datas
						if (res.data.code == -1) {
							this.$store.commit('login', {
								userName: "",
								userType: 0,
								userHeader: "@/assets/dog.jpg",
								userId: 0
							})
						} else {
							var img = ''
							img = await  (async()=>{
								var img
								await this.$axios.get('/assets/user/' + data.path,{responseType: "arraybuffer"}).then((res)=>{
									var imagedata = res.data
									img = 'data:image/png;base64,' + btoa (new Uint8Array(imagedata).reduce( (imagedata, byte) => imagedata + String.fromCharCode(byte), ''))
								}).catch((err)=>{
									console.log(err)
								})
								return img
							})()
							this.$store.commit('login', {
								userName: data.userName,
								userType: data.userType,
								userHeader: img,
								userId: data.code
							})
						}

					}).catch((err) => {
						console.log(err)
					})
				}
			}
		},
		mounted() {
			this.getUserInfo()
		},
		components: {
			MyFoot,
			MyHeader,
		},

	}
</script>
<style>
</style>
