<template>
	<div>
		<div v-if="load">
			<Spin />
		</div>
		<div v-else >
			<Scroll :height="500" :on-reach-bottom="handleBottom">
				<Table border ref="selection" :columns="columns" :data="data">
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
				],
				data:[],
				page:0,
			}
		},
		components: {
			expandRow
		},
		mounted(){
			this.fetch(1,this.page)
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
			handleBottom(){
				this.page++
				this.fetch(1,this.page)
			}
		},
	}
</script>

<style>
</style>
