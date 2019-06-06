<template>
	<div v-if="load">
		<Card v-if="images.length > 0">
			<h1 slot="title">原图片</h1>
			<Row>
				<div>
					<Spin v-if="modal1.reload" />
					<div v-else>
						<template v-for="(item, index) in images">
							<Col span="6" :key="index">
							<div :key="index">
								<Card :title="'图片' + index">
									<div slot="extra">
										<Button @click="modal1show(index,item)" size="small" icon="ios-build" ghost type="primary"></Button>
										<Button @click="deleteImage(index,item)" size="small" icon="ios-close" ghost type="error"></Button>
									</div>
									<Picture  :myStyle="'height:240px;width:240px;'" :type="'light'" :headertype="2" :path="item.path" />

								</Card>
							</div>
							</Col>
						</template>
					</div>
				
				</div>
			</Row>
			<Modal @on-visible-change="modalhide" width="400" v-model="modal1.open">
				<SinglePictureUpload ref="ModalImage" />
				<div slot="footer">
					<Button type="error" size="large" long :loading="modal1.modal1_loading" @click="updateImage">提交</Button>
				</div>
			</Modal>
		
		</Card>
		<MorePictureUpload ref="lightPicture" />
		<Button @click="upload">确定上传</Button>
	</div>
</template>

<script>
	import SinglePictureUpload from '@/pages/components/SinglePictureUpload'
	import MorePictureUpload from '@/pages/components/MorePictureUpload'
	import Picture from '@/pages/components/Picture'
	export default{
		components: {
			SinglePictureUpload,
			MorePictureUpload,
			Picture
		},
		props: {
			images1: {
				type: Array,
			},
			lightCode:{
				type:Number
			}
		},
		data() {
			return {
				images:[],
				load:false,
				modal1:{
					open: false,
					modal1_loading:false,
					code :0,
					index: 0,
					reload: false,
				},
			}
		},
		mounted(){
			setTimeout(()=>{
				this.images = this.images1

				this.load = true
			},1000)
		},
		methods: {
			async updateImage(){
				this.modal1.modal1_loading = true
				var file = this.$refs.ModalImage.upload()
				if(file == null){
					this.modal1.modal1_loading = false
					this.modal1.open = false
					this.$emit("tip",{type:"info",text:"请上传修改图片"})
					return
				}
				var formdata = new FormData()
				formdata.append("file",file)
				var success = false
				var paht = ""
				await this.$axios.post("/controller/update/image/" + 0 + "/" + this.modal1.code ,formdata,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"修改成功"})
						paht = res.data.path
						success = true
					}else{
						this.$emit("tip",{type:"error",text:"修改失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"未知错误"})
				})
				if (success) {
					this.images[this.modal1.index].path = paht
					this.modal1.reload = true
					setTimeout(()=>{
						this.modal1.modal1_loading = false
						this.modal1.reload = false
						this.modal1.open = false
					},1000)
				}else{
					this.modal1.modal1_loading = false
					this.modal1.open = false
				}
				
			},
			upload(){
				var lightPicture = this.$refs.lightPicture.upload()
				var Files = new FormData()
				var post = false
				if(lightPicture.length > 0){
					for (var i = 0; i < lightPicture.length; i++){
						Files.append('upload[]',lightPicture[i])
					}
					post = true
				}
				if (post){
					this.$axios.post("/controller/light/upload/image/" + this.lightCode ,Files,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
						if(res.data.code == 0){
							this.$emit("tip",{type:"success",text:"图片上传成功"})
						}else if(res.data.code == 1){
							this.$emit("tip",{type:"error",text:"灯饰图片上传失败"})
						}else if(res.data.code == 2){
							this.$emit("tip",{type:"error",text:"封面上传失败"})
						}else{
							this.$emit("tip",{type:"error",text:"图片上传失败"})
						}
					}).catch((err)=>{
						this.$emit("tip",{type:"warning",text:"发送未知错误"})
					})
				}else{
					this.$emit("tip",{type:"info",text:"请至少上传一张图片（封面和照片都可以）"})
				}
			},
			modalhide(ok){
				if (!ok){
					this.$refs.ModalImage.empty()
				}
			},
			modal1show(index,row){
				this.modal1.open = true
				console.log(row)
				this.modal1.index = index
				this.modal1.code = Number(row.code)
			},
			async deleteImage(index,item){
				var success = false
				await this.$axios.post("/controller/delete/image/" + item.code).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"删除成功"})
						success = true
					}else{
						this.$emit("tip",{type:"error",text:"删除失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"未知错误"})
				})
				if (success){
					this.images.splice(index,1)
					this.modal1.reload = true
					setTimeout(()=>{
						this.modal1.reload = false
					},1000)
				}
				
			},
		},
	}
</script>

<style>
</style>
