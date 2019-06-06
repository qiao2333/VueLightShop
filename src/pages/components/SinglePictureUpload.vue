<template>
	<div>
		<div>
			<Spin v-if="!show" />
			<div v-else>
				<Row>
				<Col span="7">
				<Card v-if="file!= null">
					<Button @click="removeImage(index)" ghost type="error" slot="extra" icon="ios-close"></Button>
					<img style="height: 300px;width: 300px;" :src="file.src" />
					<p>{{file.name}}</p>
				</Card>
				</Col>
				</Row>
			</div>
			<Card>
				<Upload type="drag" :format="['jpg','jpeg','png']" accept="jpg,png" paste action="" :before-upload="handleUpload">
					<Button icon="ios-cloud-upload-outline">上传图片</Button>
				</Upload>
			</Card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				file: null,
				show: true,
			}
		},
		methods: {
			handleUpload(file) {
				var reader = new FileReader()
				var obj = new Object()
				this.show = false
				reader.onload = function() {
					obj.src = reader.result;
				}
				if (file) {
					reader.readAsDataURL(file);
					obj.name = file.name
					obj.file = file
				}
				this.file = obj
				setTimeout(() => {
					this.show = true
				}, 1000)

				return false
			},
			removeImage(index) {
				this.show = false
				this.file = null
				setTimeout(() => {
					this.show = true
				}, 1000)
			},
			empty(){
				this.file = null
			},
			upload() {
				if (this.file != null){
					return this.file.file
				}
				return null
			},
		},
	}
</script>

<style>
</style>
