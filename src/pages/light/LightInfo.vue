<template>
	<div>
		<Spin v-if="load" />
		<div v-else>
			<Row style="margin-top: 50px;">
				<Col span="7" offset="2">
				<Card dis-hover>
					<div>
						<Carousel :autoplay-speed="5000" autoplay loop>
							<CarouselItem v-for="(item,index) in images" :key="index">
								<Picture :myStyle="'height:350px;width:350px;'" :headertype="2" :type="'light'" :path="item.image_path"/> 
							</CarouselItem>
						</Carousel>
					</div>
				</Card>
				</Col>
				<Col span="10">
				<Card dis-hover>
					<h1>商品名称：{{light.lightName}}</h1><br />
					<h2>商品类型：{{selectInfo.types[light.lightType].Label}}</h2><br />
					<h2>商品风格：{{selectInfo.styles[light.lightStyle].Label}}</h2><br />
					<h2>商品品牌：{{selectInfo.brands[light.lightBrand].Label}}</h2><br />
					<h2>商品材质：{{selectInfo.stuffs[light.lightStuff].Label}}</h2><br />
					<h2>单价：{{light.lightPice}}</h2><br />
					<h2>库存：{{light.count}}</h2><br />
					<h2>购买数量:<InputNumber :min="1" v-model="count" size="large" :max="Number(light.count)"></InputNumber>
					</h2>
					<div>
						<Button :disabled="hasCar" type="error" size="large" @click="addShoppingCartBtn()">{{hasCar?'已添加购物车':'加入购物车'}}</Button>
						<Button :disabled="hasCollection"  size="large" @click="addCollection()" icon="ios-star">{{hasCollection?'已添加收藏夹':'加入收藏夹'}}<Tag>{{light.storeCount}}</Tag></Button>
						<Button type="error" size="large" @click="buyNow()">立即购买</Button>
					</div>
				</Card>
				</Col>
			</Row>
			<Row>
				<Col span="18" offset="3">
				<Card height="100px">
					<h2>商品描述：</h2>
					<p>{{light.content}}</p>
				</Card>
				</Col>
			</Row>
			<Row>
				<Col span="18" offset="3">
				<UserComments :lightCode="lightCode">
			
				</UserComments>
				</Col>
			</Row>
		</div>
			
	</div>
</template>

<script>
	import UserComments from './components/userComments'
	import Picture from '@/pages/components/Picture'
	export default {
		name: "LightInfoUnKeep",
		components: {
			UserComments,
			Picture
		},
		data() {
			return {
				lightCode: 0,
				light: null,
				load: true,
				selectInfo: {},
				images:[],
				count: 1,
				hasCar:false,
				hasCollection:false,
			}
		},
		async mounted() {
			await this.getSearchInfo()
			var code = this.$route.params.code
			this.lightCode = code
			await this.fetch(code)
			setTimeout(()=>{
				this.load = false
			},1000)
		},
		methods: {
			async getSearchInfo() {
				await this.$axios.get('/controller/light/info').then((res) => {
					this.selectInfo = res.data
				}).catch((err) => {
					console.log(err)
				})
			},
			addCollection(){
				this.$axios.get("/user/addCollection/" + this.light.code).then((res) => {
					if (res.data.code == 0) {
						this.$emit("tip",{type:"success",text:"添加收藏夹成功"})
						this.hasCollection = true
						this.light.storeCount = Number(this.light.storeCount) +  1
					} else {
						this.$emit("tip",{type:"error",text:"添加收藏夹失败"})
					}
				}).catch((err) => {
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
				
			},
			addShoppingCartBtn() {
				this.$axios.post("/user/addUserCar", this.$qs.stringify({
					lightCode: this.lightCode,
					lightNumber: this.count
				})).then((res) => {
					if (res.data.code == 0) {
						this.$emit("tip",{type:"success",text:"添加购物车成功"})
						this.hasCar = true
					} else {
						this.$emit("tip",{type:"error",text:"添加购物车失败"})
					}
				}).catch((err) => {
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			buyNow() {
				var codes = new Array()
				var numbers = new Array()
				codes.push(this.light.code)
				numbers.push(this.count)
				this.$router.push({
					path: '/home/buypage',
					query: {
						codes: codes,
						numbers: numbers
					}
				})
			},
			async fetch(code) {
				await this.$axios.post("light/info/" + code).then(async (res) => {
					if (res.data.code == 0){
						this.light = res.data.datas[0]
						this.images = res.data.images
						this.hasCar = res.data.hasShop
						this.hasCollection = res.data.hasCollection
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	.header {
		height: 80px;
		padding-top: 10px;
		background: #fff;
		position: relative;
		z-index: 1000;
	}

	.w1210 {
		width: 1200px !important;
		margin: 0 auto;
		margin-top: 0px;
		margin-right: auto;
		margin-bottom: 0px;
		margin-left: auto;
	}

	.content {
		width: 1400px;
		height: 800px;
		padding-top: 0px;
		background: #fff;
		position: relative;
		z-index: 1000;
	}

	.mall-logo {
		float: left;
		width: 250px;
		height: 70px;
		position: relative;
	}

	.mall-search {
		width: 560px;
		position: relative;
		z-index: 999;
		float: left;
		margin-left: 70px;
		margin-top: 20px;
	}
</style>
