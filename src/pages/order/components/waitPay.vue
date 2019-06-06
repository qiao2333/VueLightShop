<template>
	<div>
		<div v-if="load">
			<Spin />
		</div>
		<div v-else>
			<Button :disabled="disable" type="error" @click="deleteOrders">删除</Button>
			<Scroll :height="500" :on-reach-bottom="handleBottom">
				<Table @on-selection-change="selectionChange" border ref="selection" :columns="columns" :data="data">
					<span slot="action" slot-scope="{row, column, index}">
						<Button :disabled="disable" type="default" @click="pay(row.code)" size="small">付款</Button>
						<Button :disabled="disable"  type="error" @click="deleteOrder(index,row.code)" size="small">删除订单</Button>
					</span>
				</Table>
			</Scroll>
		</div>
	</div>
</template>

<script>
	import expandRow from './expandRow'
	export default {
		data() {
			return {
				load: true,
				disable:false,
				postTypes: ["顺丰", "圆通", "韵达"],
				columns: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						type: 'expand',
						title: '详情',
						width: 50,
						render: (h, params) => {
							return h(expandRow, {
								props: {
									row: params.row
								}
							})
						}
					},
					{
						title: '订单编号',
						key: 'orderCode'
					},
					{
						title: '总费用',
						key: 'totalPrice'
					},
					{
						title: '下单时间',
						key: 'orderDate'
					},
					{
						title: '操作',
						slot: "action"
					}
				],
				data: [],
				page: 0,
				time:null,
				selects: [],
				haspay:false
			}
		},
		components: {
			expandRow
		},
		mounted() {
			this.fetch(0, this.page)
		},
		watch: {
			haspay(newValue, oldValue) {
				if (newValue == true){
					window.clearInterval(this.time)
				}
			}
		},
		methods: {
			fetch(type, page) {
				this.$axios.get("/user/getOrders/" + type + "/" + page).then((res) => {
					if (res.data.datas != null) {
						this.data = this.data.concat(res.data.datas)
					}
					this.load = false
				}).catch((err) => {
					console.log(err)
				})
			},
			pay(code) {
				this.disable = true
				this.$axios.post("/pay/repay/" + code).then((res) => {
					if (res.data.code == 0) {
						this.$emit("tip",{type:"success",text:"正在打开支付页面"})
						this.checkpayStart(res.data.alipayUrl,res.data.orderCode)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			selectionChange(data) {
				this.selects = data
			},
			checkpayStart(alipayUrl,orderCode){
				var fuc = (orderCode, fuck)=> {
					console.log("检查中")
					this.$axios.get("/user/checkpay/" + orderCode).then((res) => {
						if (res.data.code == 1) {
							this.$emit("tip", {
								type: "success",
								text: "支付成功"
							})
							fuck.disabled = false
							window.clearInterval(fuck.time)
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
			deleteOrders() {
				if (this.selects.length == 0) {
					this.$emit("tip", {
						type: 'info',
						text: "请至少选择一项"
					})
				} else {
					var codes = new Array()
					var indexs =new Array()
					for (var i = 0; i < this.selects.length; i++){
						codes.push(this.selects[i].code)
						indexs.push(this.selects[i].index)
					}
					this.postDeleteOrderCodes(indexs,codes)
				}
			},
			deleteOrder(index,code) {
				var codes = [code]
				var indexs = [index]
				this.postDeleteOrderCodes(indexs,codes)
			},
			postDeleteOrderCodes(indexs,codes) {
				this.$axios.post("/user/deleteOrders", this.$qs.stringify({
					codes: codes
				}, {
					indices: false
				})).then((res) => {
					if (res.data.code == 0) {
						this.$emit("tip", {
							type: 'success',
							text: '成功删除'
						})
						for (var i = 0 ; i< indexs.length; i++){
							this.data.splice(indexs[i],1)
						}
					} else {
						this.$emit("tip", {
							type: 'err',
							text: '删除失败'
						})
					}
				}).catch((err) => {
					this.$emit("tip", {
						type: 'warning',
						text: '发送错误'
					})
				})

			},
			handleBottom() {
				this.page++
				this.fetch(0, this.page)
			}
		},
	}
</script>

<style>
</style>
