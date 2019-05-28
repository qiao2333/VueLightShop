<template>
	<div style="margin-top: 100px;">
		<Upload action="" multiple :before-upload="handleUpload" >
		    <Button icon="ios-cloud-upload-outline">Upload files</Button>
		</Upload>
		<p>默认第一张图为封面</p>
		<Button type="primary" @click="upload">上传</Button>
	</div>
   
</template>
<script>
    export default {
		props: {
			code: {
				type: Number,
				default: 0,
				uploadfile:0,
			},
		},
        data() {
        	return {
        		Files: new FormData(),
        	}
        },
		methods: {
			handleUpload(file) {
				console.log(file)
				this.Files.append("upload[]",file)
				this.uploadfile++
				return false
			},
			upload(){
				if(this.uploadfile == 0){
					this.open("文件上传不能为空")
					return
				}
				if(this.code == 0){
					this.open("出现错误")
					return
				}
				this.$axios.post("/controller/light/upload/image/" + this.code ,this.Files,{headers: {'Content-Type': 'multipart/form-data'}}).then((res)=>{
					if(res.data.code == 0){
						this.$emit("next",0)
						
					}else{
						this.open("出现错误")
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
			open(message){
				this.$Notice.open({
				    title: message,
				});
			}
			
		},
    }
</script>
