<template>
	<div style="margin-top: 5px;">
		<DatePicker @on-change="search" type="month" :transfer="true" :editable="false"></DatePicker>
		<Scroll :height="500" :on-reach-bottom="handleReachBottom">
			<Table :loading="loading" :columns="columns1" :data="data1">
				<template slot-scope="{ row, index }" slot="action">
					<Button type="primary" size="small" style="margin-right: 5px" @click="update(index,row)">修改</Button>
					<Button type="error" size="small" @click="handledelete(index,row)">删除</Button>
				</template>
				<span slot="total" slot-scope="{ row, index }">{{row.PostFee + row.TotalPrice}}</span>
				<span slot="status" slot-scope="{ row, index }">{{status[row.Status]}}</span>
			</Table>
		</Scroll>
	</div>
</template>

<script>
	import expandRow from './ControllerOrder/expandRow'
	export default{
		components: {
			expandRow
		},
		data() {
			return {
				loading: false,
				status:["未付款","未发货","未收货","未评价","已完成"],
				columns1: [
					{
						title: "编号：",
						key: "Code",
					},
					{
					    type: 'expand',
						title: '详情',
					    width: 100,
					    render: (h, params) => {
					        return h(expandRow, {
					            props: {
					                row: params.row
					            }
					        })
					    }
					},
					{
						title: "订单编号：",
						key: "Ordercode",
				
					},
					{
						title: '总费用',
						slot: 'total'
					}, 
					{
						title: "订单状态：",
						slot: "status",
					},
					{
						title: "下单时间：",
						key: "CreateDate",
					},
					{
						title: '操作',
						fixed: 'right',
						slot: 'action',
						width: 150,
						align: 'center'
					}
				],
				data1: [],
				page:0,
				date:null
			}
		},
		methods: {
			handleReachBottom() {
				this.page++
				this.fetch(this.date,this.page)
			},
			search(value){
				this.data1 = []
				this.page = 0
				this.date = value
				this.fetch(this.date,this.page)
			},
			fetch(value,page){
				this.$axios.post("/controller/order/search", this.$qs.stringify({
					date:value,
					page:page
				})).then((res)=>{
					if (res.data.code == 0){
						if (res.data.datas != null){
							this.data1 = this.data1.concat(res.data.datas)
						}
					}
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
	}
</script>

<style>
</style>
