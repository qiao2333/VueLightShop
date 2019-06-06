<template>
	<div style="width: auto;padding-left: 300px;">
		<Menu mode="horizontal" theme="dark" active-name="1" @on-select="handleSelect">
			<MenuItem name="light">
			<Icon type="ios-home-outline" size="24" />主页
			</MenuItem>
			<MenuItem name="buycar">
			<Icon type="ios-cart-outline" size="24" />我的购物车
			</MenuItem>
			<MenuItem name="order">
			<Icon type="ios-bulb-outline" size="24" />我的订单
			</MenuItem>
			<MenuItem name="collection">
			<Icon type="ios-star-outline" size="24" />收藏夹
			</MenuItem>
			<MenuItem name="person">
			<!--<div style="height: 30px;">
				{{this.$store.getters.getUserName}}
				<Avatar :src="this.$store.getters.getHeader" />
			</div>-->
			<Avatar icon="ios-person" size="large" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
			</MenuItem>

		</Menu>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				navlist: [{
					key: 1,
					url: "test",
					name: "测试页面"
				}, {
					key: 2,
					url: "light",
					name: "灯饰页面"
				}, {
					key: 3,
					url: "buypage",
					name: "支付页面"
				}]
			}
		},
		methods: {
			handleSelect(name) {
				this.$router.push('/home/' + name);
			}
		},
		
	}
</script>
<style>

</style>