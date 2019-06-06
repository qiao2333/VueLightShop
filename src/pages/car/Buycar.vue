<template>
	<div>
		<!--<Search></Search>
    <GoodsListNav></GoodsListNav>-->
		<div class="goods-list-container">
			<Alert show-icon class="tips-box">
				小提示
				<Icon type="ios-lightbulb-outline" slot="icon"></Icon>
				<template slot="desc">请点击商品前的选择框，选择购物车中的商品，点击购买即可。</template>
			</Alert>
			<Spin v-if="hasload" />
			<div v-else>
				<Table @on-selection-change="selection" ref="table1" border :columns="columns" :data="data">
					<template slot-scope="{ row, index }" slot="shop">
						<Picture :myStyle="'height:100px;width:100px'"  :type="'light'" :path="row.path" :headertype="2" />
						<p>{{row.lightName}}</p>
					</template>
					<template slot-scope="{ row, index }" slot="numbers">
						<div v-if="row.count==0||row.count==''" style="color: red;">
							该商品缺货中
						</div>
						<div v-else>
							<Button size="small" @click="numberDown(row,index)" icon="md-arrow-dropleft"></Button>
							{{row.lightNumber}}
							<Button size="small" @click="numberUp(row,index)" icon="md-arrow-dropright"></Button>
						</div>
					</template>
				</Table>
				<h1>总价格：{{totalprice}}</h1>
				<ButtonGroup size="large">
					<Button @click="selectAll">全选商品</Button>
					<Button @click="clearAll">清空选项</Button>
					<Button type="error" @click="deleteUserCar">删除选中商品</Button>
					<Button @click="buy">购买</Button>
				</ButtonGroup>
			</div>
		</div>

	</div>
	</div>
</template>

<script>
	import Picture from '@/pages/components/Picture'
	export default {
		name:"BuyCarUnKeep",
		components: {
			Picture,
		},
		data() {
			return {
				columns: [{
						type: 'selection',
						width: 58,
						align: 'center'
					},
					{
						title: '商品',
						width: 200,
						slot: 'shop',
						align: 'center'
					},
					{
						title: '价格',
						key: 'lightPrice',
						align: 'center'
					},
					{
						title: '数量',
						slot: 'numbers',
						width: 200,
						align: 'center',
					}
				],
				selects: [],
				numberses: [],
				hasload: true,
				data: [],
				totalprice: 0,
			};
		},
		mounted() {
			this.getCars(0)
		},
		methods: {
			test(value) {
				console.log(value)
			},
			consum(){
				var consum = 0
				for (var i = 0; i < this.selects.length; i++) {
					consum += this.selects[i].lightPrice * this.numberses[this.selects[i].index]
				}
				this.totalprice = consum.toFixed(2)
			},
			selectAll(data) {
				this.$refs.table1.selectAll(true)
			},
			selection(data) {
				this.selects = data
				this.consum()
			},
			deleteUserCar(){
				var codes = new Array()
				for (var i = 0; i < this.selects.length; i++){
					codes.push(this.selects[i].code)
				}
				
				this.$axios.post("/user/deleteUserCar",this.$qs.stringify({
					codes:codes
				}, {
					indices: false
				})).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"删除成功"})
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
			clearAll(data) {
				this.$refs.table1.selectAll(false)
			},
			//axios获取购物车数据
			getCars() {
				this.$axios.post("/user/getCars").then((res) => {
					var data = res.data.datas
					var numberses = new Array()
					for (var i = 0; i < data.length; i++) {
						var number = Number(((Number(data[i].lightNumber) <= Number(data[i].count)) ? Number(data[i].lightNumber) :
							Number(data[i].count)))
						numberses.push(number)
						data[i].lightNumber = number
						data[i].index = i
					}
					this.numberses = numberses
					this.data = res.data.datas
					this.hasload = false
				}).catch((err) => {
					console.log(err)
				})
			},
			//购买
			buy() {
				var codes = new Array()
				var numbers = new Array()
				for (var i = 0; i < this.selects.length; i++){
					codes.push(this.selects[i].lightCode)
					numbers.push(this.numberses[this.selects[i].index])
				}
				this.$router.push({
					path: '/home/buypage',
					query: {
						codes: codes,
						numbers: numbers
					}
				})
			},
			numberUp(row, index) {
				if (this.numberses[index] < Number(this.data[index].count)) {
					this.numberses[index] = this.numberses[index] + 1
					row.lightNumber = this.numberses[index]
					this.consum()
				}
			},
			numberDown(row, index) {
				if (this.numberses[index] > 0) {
					this.numberses[index] = this.numberses[index] - 1
					row.lightNumber = this.numberses[index]
					this.consum()
				}
			},
		},
	};
</script>

<style scoped>
	.goods-list-container {
		margin: 15px auto;
		width: 80%;
	}

	.tips-box {
		margin-bottom: 15px;
	}

	.address-container {
		margin-top: 15px;
	}

	.address-box {
		margin-top: 15px;
		padding: 15px;
		border: 1px #ccc dotted;
	}

	.address-check {
		margin: 15px 0px;
		height: 36px;
		display: flex;
		align-items: center;
	}

	.address-check-name {
		width: 120px;
		display: flex;
		justify-content: center;
		align-content: center;
		background-color: #ccc;
	}

	.address-check-name span {
		width: 120px;
		height: 36px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
		color: #fff;
		background-color: #f90013;
	}

	.address-detail {
		padding-left: 15px;
		font-size: 14px;
		color: #999999;
	}

	.remarks-container {
		margin: 15px 0px;
	}

	.remarks-input {
		margin-top: 15px;
	}

	.invoices-container p {
		font-size: 12px;
		line-height: 30px;
		color: #999;
	}

	.pay-container {
		margin: 15px;
		display: flex;
		justify-content: flex-end;
	}

	.pay-box {
		font-size: 18px;
		font-weight: bolder;
		color: #495060;
	}

	.money {
		font-size: 26px;
		color: #f90013;
	}

	.pay-btn {
		margin: 15px 0px;
		display: flex;
		justify-content: flex-end;
	}
</style>
