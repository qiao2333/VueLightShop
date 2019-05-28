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
			<LightImageUpload :code="code" @next="next"></LightImageUpload>
		</div>
		<div v-else-if="current==2">
			完成
		</div>
	</div>
</template>

<script>
	import LightInfoForm from './components/LightInfoForm'
	import LightImageUpload from './components/LightImageUpload'
	export default {
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
