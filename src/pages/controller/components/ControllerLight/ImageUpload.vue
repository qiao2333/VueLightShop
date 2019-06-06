<template>
	<div>
		<h1>封面</h1>
		<Cover @tip="tip" :cover1="cover" :lightCode="lightCode" />
		<h1>灯饰照片</h1>
		<PImage @tip="tip" :images1="images" :lightCode="lightCode"  />
	</div>
</template>

<script>
	import PImage from './PImage'
	import Cover from './Cover'
	export default{
		components: {
			PImage,
			Cover
		},
		props: {
			cover: {
				type: Object,
			},
			images:{
				type: Array,
			},
			lightCode:{
				type:Number
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			tip(data){
				this.$emit("tip",data)
			}
		},
	}
</script>

<style>
</style>
