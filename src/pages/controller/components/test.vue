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
				if(cover != null){
					this.Files.append('cover',cover)
				}
				if(lightPicture.length > 0){
					for (var i = 0; i < lightPicture.length; i++){
						this.Files.append('upload[]',lightPicture[i])
					}
				}
				this.$axios.post("/controller/light/upload/image/" + 11 ,this.Files,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
					if(res.data.code == 0){
						alert("上传成功")
					}else{
						alert("出现错误")
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
		},
    }
</script>
