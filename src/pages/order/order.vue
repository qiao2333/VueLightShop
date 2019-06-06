<template>
	<div>
		<div>
			<h1 align="center">我的订单</h1>
		</div>
		<div>
			<Tabs value="name1">
				<TabPane label="已完成订单" name="name1">
					<finish @tip="tip" />
				</TabPane>
				<TabPane label="待付款" name="name2">
					<waitPay @tip="tip" />
				</TabPane>
				<TabPane label="待发货" name="name3">
					<waitPost @tip="tip" />
				</TabPane>
				<TabPane label="待收货" name="name4">
					<waitReceive @tip="tip" />
				</TabPane>
				<TabPane label="待评价" name="name5">
					<waitComment @tip="tip" />
				</TabPane>
			</Tabs>
		</div>

	</div>

</template>
<script>
	import finish from './components/finish'
	import waitReceive from './components/waitReceive'
	import waitComment from './components/waitComment'
	import waitPay from './components/waitPay'
	import waitPost from './components/waitPost'
	
	export default {
		name:"OrderUnKeep",
		components: {
			finish,
			waitReceive,
			waitComment,
			waitPay,
			waitPost
		},
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
		
	}
</script>

<style>

</style>
