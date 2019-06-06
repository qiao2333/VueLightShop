<template>
	<div>
		<Spin v-if="load" />
		<div v-else>
			<Card style="text-align: center;">
				<Picture ref="Picture" :type="'user'" :headertype="2" :path="path" />
				<Button type="primary" @click="changeImage">修改</Button>
			</Card>
			<Modal v-model="showModal" :loading="loading" @on-ok="ok" @on-cancel="cancel">
				<img v-if="imagepath!=''" :src="image" />
				<h2 v-else>尚未上传头像</h2>
				<Upload action="api/user/uploadheader" name="file" :with-credentials="true" :show-upload-list="false" :format="['jpg','jpeg','png']" :max-size="2048" >
					<Button style="width: 58px;height:58px;line-height: 58px;">
						<Icon type="ios-camera" size="20"></Icon>
					</Button>
				</Upload>
			</Modal>
		</div>
	</div>
</template>

<script>
	import Picture from '../../components/Picture'
	export default {
		props: {
			imagepath: {
				type: String,
			},
		},
		components: {
			Picture
		},
		data() {
			return {
				loading: false,
				showModal: false,
				load: true,
				path: "",
				image: null,
			}
		},
		mounted() {
			this.path = this.imagepath
			this.load = false
		},
		methods: {
			changeImage() {
				this.image = this.$refs.Picture.getPicture()
				this.showModal = true
			},
			ok() {

			},
			cancel() {

			},
		},
	}
</script>

<style>
</style>
