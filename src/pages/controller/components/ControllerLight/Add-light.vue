<template>
	<div>
		<Steps :current="current">
			<Step title="灯饰基本信息"></Step>
			<Step title="灯饰照片上传"></Step>
			<Step title="完成"></Step>
		</Steps>
		
		<div v-if="current==0">
			<LightInfoForm @next="next"></LightInfoForm>
		</div>
		<div v-else-if="current==1">
			<LightImageUpload @tip="tip" :code="code" @next="next"></LightImageUpload>
		</div>
		<div v-else-if="current==2">
			<br />
			<h1>完成</h1>
		</div>
	</div>
</template>

<script>
	import LightInfoForm from './LightInfoForm'
	import LightImageUpload from './LightImageUpload'
	export default {
		name:"AddLightUnKeep",
		data() {
			return {
				current: 0,
				code:0,
			}
		},
		methods: {
			next(code) {
				this.code = code
				this.current++
			},
			tip(data){
				this.$emit("tip",data)
			}
		},
		components: {
			LightInfoForm,
			LightImageUpload
		},
		
		
	}
</script>

<style>
</style>
