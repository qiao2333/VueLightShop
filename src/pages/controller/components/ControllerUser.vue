<template>
	<div>
		<Input v-model="searchMessage.search" search @on-search="search" />
		<Scroll :on-reach-bottom="handleReachBottom">
			<Table :loading="loading" :columns="columns1" :data="data1"></Table>
		</Scroll>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				loading: false,
				searchMessage:{
					page:0,
					search:"",
					pageCount:50,
				},
				columns1:[
					{
						title:"账号ID：",
						key:"Code",
					},
					{
						title:"灯饰名称：",
						key:"UserName",
					},
					{
						title:"用户密码：",
						key:"UserPassword",
					},
					{
						title:"用户类型",
						key:"UserType",
					}
				],
				data1:[],
				selectInfo:{},
			}
		},
		methods: {
			search(value){
				this.loading = true
				this.searchMessage.page = 0
				this.$axios.post("/controller/user/search", this.$qs.stringify({
					page: this.searchMessage.page, 
					name: this.searchMessage.search
					})).then((res)=>{	
					this.data1 = res.data.users
					this.loading = false
				}).catch((err)=>{
					console.log(err)
				})
			},
			handleReachBottom(){
				this.searchMessage.page++
				this.$axios.post("/controller/user/search", this.$qs.stringify({
					page: this.searchMessage.page, 
					name: this.searchMessage.search
					})).then((res)=>{
					this.data1 = this.data1.concat(res.data.users)
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
	}
</script>

<style>
</style>
