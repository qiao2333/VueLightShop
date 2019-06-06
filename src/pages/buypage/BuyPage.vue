<template>
	<div>
		<Card title="购买商品">
			<Table ref="table" :columns="columns1" :data="data1">
				<template slot-scope="{ row, index }" slot="shop">
					<div>
						<Picture :myStyle="'height:100px;width:100px'"  :type="'light'" :path="row.path" :headertype="2" />
						<p>{{row.lightName}}</p>
					</div>
				</template>
				<template slot-scope="{ row, index }" slot="totalPrice">
					<div>
						{{(row.lightPrice * row.number).toFixed(2)}}
					</div>
				</template>
			</Table>
		</Card>
		<Card title="购买信息">
			<Form>
				<FormItem label="选择收货地址">
					<Select v-model="orderinfo.addressCode" :loading="addressloading">
						<Option v-for="(item, index) in addressOptions" :key="index" :value="item.value">
							{{item.label}}
						</Option>
					</Select>
				</FormItem>
				<FormItem label="邮寄方式">
					<Select @on-change="changePostType" v-model="orderinfo.PostType" label="邮寄方式">
						<Option value="1">顺丰</Option>
						<Option value="2">圆通</Option>
						<Option value="3">韵达</Option>
					</Select>
				</FormItem>
			</Form>
			<p>邮寄费用：{{orderinfo.PostFee}}</p>
			<h1>总价：{{total}}</h1>
			<Button :disabled="disabled" type="primary" @click="buy">购买</Button>
		</Card>
	</div>
</template>

<script>
	import Picture from '@/pages/components/Picture'
	export default {
		name: "BuyPageUnKeep",
		data() {
			return {
				columns1: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: "商品",
						slot: 'shop',
						align: 'center'
					},
					{
						title: "价格",
						key: "lightPrice"
					},
					{
						title: "数量",
						key: 'number',
					},
					{
						title: "总价",
						slot: 'totalPrice',
					}
				],
				orderinfo: {
					totalPrice: 0,
					PostFee: 0,
					PostType: "",
					addressCode: "",
				},
				disabled: false,
				codes: [],
				data1: [],
				addressloading: true,
				addressOptions: [],
				time:null,
				haspay:false
			}
		},
		components: {
			Picture
		},
		async mounted() {
			var codes = this.$route.query.codes
			var numbers = this.$route.query.numbers
			await this.getData(codes, numbers)
			this.totalPrice()
			this.getAddress()
		},
		computed: {
			total() {
				return (this.orderinfo.PostFee + this.orderinfo.totalPrice).toFixed(2)
			}
		},
		watch: {
			haspay(newValue, oldValue) {
				if (newValue == true){
					window.clearInterval(this.time)
					this.disabled = false
				}
			}
		},
		methods: {
			changePostType(value) {
				switch (value) {
					case "1":
						this.orderinfo.PostFee = 35;
						break;
					case "2":
						this.orderinfo.PostFee = 20;
						break;
					case "3":
						this.orderinfo.PostFee = 15;
						break;
				}
			},
			totalPrice() {
				var totalPrice = 0
				var data = this.data1
				for (var i = 0; i < data.length; i++) {
					totalPrice += data[i].lightPrice * data[i].number
				}
				this.orderinfo.totalPrice = totalPrice
			},
			getAddress() {
				this.$axios.get("/user/UserAddressInfo").then((res) => {
					if (res.data.code == 0) {
						const data = res.data.datas
						var arr = new Array()
						for (var i = 0; i < data.length; i++) {
							var obj = new Object()
							obj.label = data[i].state + data[i].city + data[i].area + data[i].street
							obj.value = data[i].code
							arr.push(obj)
						}
						this.addressOptions = arr
						this.addressloading = false
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			async getData(codes, numbers) {
				await this.$axios.post("/user/buypage", this.$qs.stringify({
					codes: codes
				}, {
					indices: false
				})).then((res) => {
					const data = res.data.datas
					var datas = new Array()
					for (var i = 0; i < data.length; i++) {
						var obj = new Object()
						obj.lightName = data[i].lightName
						obj.code = data[i].code
						obj.lightCount = data[i].lightCount
						obj.lightPrice = data[i].lightPrice
						obj.path = data[i].path
						obj.number = numbers[i]
						datas.push(obj)
					}
					this.data1 = datas
					console.log(res)
				}).catch((err) => {
					console.log(err)
				})
			},
			buy() {
				if (this.orderinfo.addressCode == "") {
					this.$emit("tip", {
						type: "info",
						text: "请选择送货地址"
					})
					return
				}
				if (this.orderinfo.PostType == "") {
					this.$emit("tip", {
						type: "info",
						text: "请选择邮寄方式"
					})
					return
				}
				this.disabled = true
				var lightCode = new Array()
				var Numbers = new Array()
				for (var i = 0; i < this.data1.length; i++) {
					lightCode.push(this.data1[i].code)
					Numbers.push(this.data1[i].number)
				}
				this.$axios.post("/pay/zhifu", this.$qs.stringify({
					lightCode: lightCode,
					Numbers: Numbers,
					total: (this.orderinfo.totalPrice).toFixed(2),
					postType: this.orderinfo.PostType,
					postFee: (this.orderinfo.PostFee).toFixed(2),
					addressCode: this.orderinfo.addressCode
				}, {
					indices: false
				})).then((res) => {
					if (res.data.code == 0) {
						this.$emit("tip", {
							type: "success",
							text: "正在打开支付页面"
						})
						this.checkpayStart(res.data.alipayUrl, res.data.orderCode)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			checkpayStart(alipayUrl, orderCode) {
				this.haspay = false
				var fuc = (orderCode, fuck)=> {
					console.log("检查中")
					this.$axios.get("/user/checkpay/" + orderCode).then((res) => {
						if (res.data.code == 1) {
							this.$emit("tip", {
								type: "success",
								text: "支付成功"
							})
							fuck.haspay = true
						}
					}).catch((err) => {
						console.log(err)
					})
				};
				setTimeout((alipayUrl) => {
					window.open(alipayUrl)
				}, 3000, alipayUrl)
				this.time = window.setInterval(fuc, 5000, orderCode, this)
			},

		},
	}
</script>

<style>
</style>
