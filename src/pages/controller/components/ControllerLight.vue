<template>
	<div>
		<Input v-model="searchMessage.search" search @on-search="search" />
		<Scroll :on-reach-bottom="handleReachBottom">
			<Table :loading="loading" :columns="columns1" :data="data1">
				<template slot-scope="{ row, index }" slot="action">
					<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
					<Button type="error" size="small" @click="handledelete(index)">删除</Button>
				</template>
			</Table>
		</Scroll>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				searchMessage: {
					page: 0,
					search: "",
					pageCount: 50,
				},
				columns1: [{
						title: "灯饰编号：",
						key: "code",
					},
					{
						title: "灯饰名称：",
						key: "name",

					},
					{
						title: "灯饰类型：",
						key: "type",
					},
					{
						title: "灯饰品牌：",
						key: "brand",

					},
					{
						title: "灯饰风格：",
						key: "style",
					},
					{
						title: "灯饰材质：",
						key: "stuff",
					},
					{
						title: "灯饰颜色：",
						key: "color",
					},
					{
						title: "灯饰价格：",
						key: "price",
					},
					{
						title: "灯饰库存量：",
						key: "count",
					},
					{
						title: "灯饰说明：",
						key: "descript",
					},
					{
						title: 'Action',
						key: 'action',
						fixed: 'right',
						slot: 'action',
						width: 150,
						align: 'center'
					}
				],
				data1: [],
				selectInfo: {},
			}
		},
		mounted() {
			this.fetch()
		},
		methods: {
			fetch() {
				this.$axios.get('/controller/light/info').then((res) => {
					this.selectInfo = res.data
				}).catch((err) => {
					console.log(err)
				})
			},
			search(value) {
				this.loading = true
				this.searchMessage.page = 0
				this.$axios.post("/controller/light/search", this.$qs.stringify({
					page: this.searchMessage.page,
					name: this.searchMessage.search
				})).then((res) => {
					this.data1 = res.data.lights
					this.loading = false
				}).catch((err) => {
					console.log(err)
				})
			},
			handleReachBottom() {
				this.searchMessage.page++
				this.$axios.post("/controller/light/search", this.$qs.stringify({
					page: this.searchMessage.page,
					name: this.searchMessage.search
				})).then((res) => {
					this.data1 = this.data1.concat(res.data.lights)
				}).catch((err) => {
					console.log(err)
				})
			},
			handledelete(value) {
				
				alert(this.data1[value].code)
			},
			show(){
				
			}
		},
	}
</script>

<style>
</style>
