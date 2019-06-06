<template>
	<div>
		<Layout>
			<Header>
				<MyHeader></MyHeader>
			</Header>
			<Content style="height:auto;">
				<keep-alive :exclude="/UnKeep$/">
					<routerView  @tip="tip"></routerView>
				</keep-alive>
			</Content>
			<Footer>
				<MyFoot></MyFoot>
			</Footer>
		</Layout>
	</div>
</template>
<script>
	import MyHeader from './components/Header'
	import MyFoot from './components/Foot'
	export default {
		data() {
			return {

			}
		},
		methods: {
			tip(data){
				switch (data.type){
					case "error":{
						this.$Notice.error({
							title:"错误",
							desc:data.text
						})
					};break;
					case "success":{
						this.$Notice.success({
							title:"成功",
							desc:data.text
						})
					};break;
					case "info":{
						this.$Notice.info({
							title:"消息",
							desc:data.text
						})
					};break;
					case "warning":{
						this.$Notice.warning({
							title:"警告",
							desc:data.text
						})
					};break;
				}
				
			}
		},
		
		components: {
			MyFoot,
			MyHeader,
		},

	}
</script>
<style>
</style>
