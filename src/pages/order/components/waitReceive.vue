<template>
	<div>
		<div v-if="load">
			<Spin />
		</div>
		<div v-else >
			<Scroll :height="500"  :on-reach-bottom="handleBottom">
				<Table border ref="selection" :columns="columns" :data="data">
					<span slot="action" slot-scope="{row, column, index}">
						<Button type="default" @click="receive(index,row.code)" size="small">收货</Button>
					</span>
				</Table>
			</Scroll>
		</div>
	</div>
</template>

<script>
	import expandRow from './expandRow'
	export default{
		data() {
			return {
				load:true,
				postTypes:["顺丰","圆通","韵达"],
				columns: [
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
				data:[],
				page:0,
			}
		},
		components: {
			expandRow
		},
		mounted(){
			this.fetch(2,this.page)
		},
		methods: {
			fetch(type,page){
				this.$axios.get("/user/getOrders/" + type + "/" + page).then((res)=>{
					if (res.data.datas != null){
						this.data = this.data.concat(res.data.datas)
					}
					this.load = false
				}).catch((err)=>{
					console.log(err)
				})
			},
			receive(index,code) {
				this.$axios.get("/user/updateOrderStatus/" + 3 + "/" + code ).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"收货成功"})
						this.data.splice(index,1)
					}else{
						this.$emit("tip",{type:"error",text:"收货失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"出现错误"})
				})
			},
			handleBottom(){
				this.page++
				this.fetch(2,this.page)
			}
		},
	}
</script>

<style>
</style>
