<template>
	<div style="margin-top: 100px;">
		<h1>封面</h1>
		<SinglePictureUpload ref="cover" />
		<h1>灯饰照片</h1>
		<MorePictureUpload ref="lightPicture" />
		<Button type="primary" @click="upload">上传</Button>
	</div>
   
</template>
<script>
	import SinglePictureUpload from '@/pages/components/SinglePictureUpload'
	import MorePictureUpload from '@/pages/components/MorePictureUpload'
    export default {
		components: {
			SinglePictureUpload,
			MorePictureUpload
		},
		props: {
			code: {
				type: Number,
			},
		},
        data() {
        	return {
        		Files: new FormData(),
        	}
        },
		methods: {
			upload(){
				var cover = this.$refs.cover.upload()
				var lightPicture = this.$refs.lightPicture.upload()
				var post = false
				if(cover != null){
					this.Files.append('cover',cover)
					post = true
				}
				if(lightPicture.length > 0){
					for (var i = 0; i < lightPicture.length; i++){
						this.Files.append('upload[]',lightPicture[i])
					}
					post = true
				}
				if (post){
					this.$axios.post("/controller/light/upload/image/" + this.code ,this.Files,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
						if(res.data.code == 0){
							this.$emit("tip",{type:"success",text:"图片上传成功"})
							this.$emit("next",0)
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
		},
    }
</script>
