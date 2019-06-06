<template>
	<div v-if="load">
		<Row>
			<Col span="6">
				<Spin v-if="modal1.reload" />
				<div v-else>
					<Card v-if="cover != null" title="原图片">
						<div slot="extra">
							<Button @click="modal1show(0,cover)" size="small" icon="ios-build" ghost type="primary"></Button>
							<Button @click="deleteImage(0,cover)" size="small" icon="ios-close" ghost type="error"></Button>
						</div>
						<Picture  :myStyle="'height:240px;width:240px;'" :type="'light'" :headertype="2" :path="cover.path" />
					</Card>
					<div v-else>
						<SinglePictureUpload  ref="cover" />
						<Button @click="upload">确定上传</Button>
					</div>
				</div>
			</Col>
		</Row>
		<Modal @on-visible-change="modalhide" width="400" v-model="modal1.open">
			<SinglePictureUpload ref="ModalImage" />
			<div slot="footer">
				<Button type="error" size="large" long :loading="modal1.modal1_loading" @click="updateImage">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	import SinglePictureUpload from '@/pages/components/SinglePictureUpload'
	import Picture from '@/pages/components/Picture'
	export default{
		components: {
			SinglePictureUpload,
			Picture
		},
		props: {
			cover1: {
				type: Object,
			},
			lightCode:{
				type:Number
			}
		},
		data() {
			return {
				cover:null,
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
				this.cover = this.cover1
				this.load = true
			},1000)
		},
		methods:{
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
				var path = ""
				await this.$axios.post("/controller/update/image/" + 1 + "/" + this.modal1.code ,formdata,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"修改成功"})
						path = res.data.path
						success = true
					}else{
						this.$emit("tip",{type:"error",text:"修改失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"未知错误"})
				})
				if (success) {
					this.cover.path= path
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
			
			modalhide(ok){
				if (!ok){
					this.$refs.ModalImage.empty()
				}
			},
			upload(){
				var cover = this.$refs.cover.upload()
				var post = false
				var Files = new FormData()
				if(cover != null){
					Files.append('cover',cover)
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
			modal1show(index,row){
				this.modal1.open = true
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
					this.cover = null
					this.modal1.reload = true
					setTimeout(()=>{
						this.modal1.reload = false
					},1000)
				}
				
			},
		}
	}
</script>

<style>
</style>
