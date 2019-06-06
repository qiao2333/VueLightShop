<template>
	<div style="margin-top: 5px;">
		<Row>
			<Col span="4">
				<Input label="根据名字搜索" clearable  v-model="searchMessage.search" search @on-search="search" />
			</Col>
			<Col offset="16" span="4">
				<Button to="/controller/addLight">添加灯饰</Button>
			</Col>
		</Row>
		<Scroll :height="500" :on-reach-bottom="handleReachBottom">
			<Table :loading="loading" :columns="columns1" :data="data1">
				<template slot-scope="{ row, index }" slot="action">
					<Button type="primary" size="small" style="margin-right: 5px" @click="update(index,row)">修改</Button>
					<Button type="error" size="small" @click="handledelete(index,row)">删除</Button>
				</template>
			</Table>
		</Scroll>
	</div>
</template>

<script>
	export default {
		name:'ControllerLight',
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
			handledelete(index,row) {
				this.$axios.get("/controller/light/delete/" + row.code).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"删除成功"})
						this.data1.splice(index,1)
					}else{
						this.$emit("tip",{type:"error",text:"删除失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			update(index, row){
				row.code
				this.$router.push({path:"/controller/updateLight",query:{code:row.code}})
			}
		},
	}
</script>

<style>
</style>
