<template>
	<div>
		<div v-if="load">
			<Spin />
		</div>
		<div v-else>
			<Card title="邮递信息">
				<h1>地址:{{address.address}}</h1>
				<h2>详细:{{address.content}}</h2>
				<h2>邮寄类型:{{row.PostType}}</h2>
				<h2>邮寄费用:{{row.PostFee}}</h2>
			</Card>
			<Card title="商品列表">
				<Card v-for="(item, index)  in shoplist" :key="index">
					<a :href="'/#/home/info/' + item.lightCode">
						<Row>
							<Col span="4">
							<Picture :path="item.path" :type="'light'" :headertype="3" />
							{{item.lightName}}
							</Col>
							<Col span="4">
							<h2>价格:{{item.lightPrice}}</h2>
							</Col>
							<Col span="4">
							<h2>数量:{{item.number}}</h2>
							</Col>
							<Col span="12">
							<h2>介绍:{{item.content}}</h2>
							</Col>
						</Row>
					</a>
				</Card>
			</Card>
		</div>
	</div>
</template>

<script>
	import Picture from '@/pages/components/Picture'
	export default {
		props: {
			row: {
				type: Object,
			}
		},
		components:{
			Picture
		},
		data() {
			return {
				load: true,
				address: null,
				shoplist: [],
			}
		},
		mounted() {
			this.fetch(this.row.Code, this.row.AddressCode,this.row.UserCode)
		},
		methods: {
			fetch(code, addressCode,userCode) {
				this.$axios.get("/controller/orderInfo/" + addressCode + "/" + userCode + "/" + code).then((res)=>{
					if (res.data.code == 0){
						console.log(res.data)
						this.address = res.data.data1[0]
						this.shoplist = res.data.data2
						this.load = false
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
