<template>
	<div>
		<Spin v-if="load" />
		<div v-else>
			<Card title="收藏">
				<Scroll :height="800" :on-reach-bottom="handleReachBottom">
					<template v-for="(item, index) in collections">
						<Card :key="index" style="text-align: center;">
							<Row>
								<Col span="4">
								<a :href="'/#/home/info/' + item.lightCode">
									<Picture :myStyle="'height:120px;width:120px'" :path="item.path" :type="'light'" :headertype="2" />
									{{item.lightName}}
								</a>
								</Col>
								<Col span="4">
								<h1>价格:{{item.lightPrice}}</h1>
								</Col>
								<Col span="14">
								<h1>说明:{{item.Descript}}</h1>
								</Col>
								<Col span="2">
								<Button type="error" @click="deleteUserCar(index,item.code)">删除</Button>
								</Col>
							</Row>
						</Card>
					</template>

				</Scroll>
			</Card>
		</div>


	</div>
</template>

<script>
	import Picture from '@/pages/components/Picture'
	export default {
		data() {
			return {
				collections: [],
				page: 0,
				load: true,
			}
		},
		components: {
			Picture
		},
		mounted() {
			this.fetch(0)
			
		},
		methods: {
			fetch(page) {
				this.$axios.get("/user/getCollection/" + page).then((res) => {
					if (res.data.code == 0) {
						this.collections = this.collections.concat(res.data.datas)
						this.load = false
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			handleReachBottom() {
				this.page++
				this.fetch(this.page)
				setTimeout()
			},
			deleteUserCar(index,code) {
				this.$axios.get("/user/deleteCollection/" + code).then((res) => {
					if(res.data.code == 0){
						this.open("成功","删除成功")
						this.collections.splice(index, 1);
					}else{
						this.open("失败","删除失败")
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			open(title, text) {
				this.$Notice.open({
					title: title,
					desc: text
				});
			}
		},
		
	}
</script>

<style>
</style>
