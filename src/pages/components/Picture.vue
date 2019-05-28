<template>
	<div>
		<Spin v-if="load" />
		<!-- 头像文件 -->
		<div v-else>
			<div v-if="headertype == 1">
				<Avatar v-if="path!=''" icon="ios-person" size="large" :src="imagepath" />
				<Avatar v-else icon="ios-person" size="large" src="@/assets/dog.jpg" />
			</div>
			<!-- 个人页面大头像 -->
			<div v-else-if="headertype == 2">
				<img  v-if="path!=''" style="height: 300px;width: 280px;" :src="imagepath" />
				<img  v-else  style="height: 300px;width: 280px;" src="@/assets/dog.jpg"  />
			</div>
			<div v-else-if="headertype == 3">
				<img  v-if="path!=''" style="height: 100px;width: 100px;" :src="imagepath" />
				<img  v-else style="height: 100px;width: 100px;"  src="@/assets/dog.jpg"  />
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		props: {
			path: {
				type: String,
			},
			headertype: {
				type: Number,
			}
		},
		data() {
			return {
				load:true,
				imagepath: ""
			}
		},
		mounted(){
			this.fetch()
		},
		methods: {
			fetch() {
				if (this.path == ""){
					this.load = false
				}else{
					this.$axios.get('/assets/user/' + this.path,{responseType: "arraybuffer"}).then((res)=>{
						var imagedata = res.data
						var img = 'data:image/png;base64,' + btoa (new Uint8Array(imagedata).reduce( (imagedata, byte) => imagedata + String.fromCharCode(byte), ''))
						this.imagepath = img
						this.load = false
					}).catch((err)=>{
						console.log(err)
					})
				}
			},
			getPicture(){
				return this.imagepath
			}
		},
	}
</script>

<style scope>
	img{
		heiht: 500px;
		width: 380px;
		border-radius: 10px;
	}
</style>
