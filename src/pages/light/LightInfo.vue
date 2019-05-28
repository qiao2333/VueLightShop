<template>
	<div>
		<Spin v-if="hasload == false" />
		<div v-else class="container">
			<div class="head" style="height: auto;">
				<div class="header">
					<div class="w1210">
						<div class="mall-logo">
							<img src="@/assets/lightlogo.png" />
						</div>
						<div class="mall-search">
							<Input size="large" search enter-button placeholder="输入你要搜索的商品" />
						</div>
					</div>
				</div>
			</div>
			<Row style="margin-top: 50px;">
				<Col span="5" offset="3">
				<Card dis-hover>
					<Spin v-if="imageLoad == false" />
					<div v-else>
						<img v-if="image == null" src="@/assets/dog.jpg" style="height: 280px;width: 250px;" />
						<img v-else :src="image" style="height: 280px;width: 250px;">
					</div>
				</Card>
				</Col>
				<Col span="10">
				<Card dis-hover>
					<h1>商品名称：{{light.light_name}}</h1><br />
					<h2>商品类型：{{light.lightType}}</h2><br />
					<h2>商品风格：{{light.lightStyle}}</h2><br />
					<h2>商品品牌：{{light.lightBrand}}</h2><br />
					<h2>商品材质：{{light.lightStuff}}</h2><br />
					<h2>单价：{{light.lightPrice}}</h2><br />
					<h2>购买数量:<InputNumber :min="1" v-model="count" size="large"></InputNumber>
					</h2>
					<div>
						<Button type="error" size="large" @click="addShoppingCartBtn()">加入购物车</Button>
						<Button type="error" size="large" @click="buyNow()">立即购买</Button>
					</div>
				</Card>
				</Col>
			</Row>
			<Row>
				<Col span="18" offset="3">
				<Card height="100px">
					<h2>商品描述：</h2>
					<p>{{light.light_descript}}</p>
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
	export default {
		components: {
			UserComments
		},
		data() {
			return {
				lightCode:0,
				light: {
					light_name: "",
					light_descript: "",
					lightType: "",
					lightStuff: "",
					lightStyle: "",
					lightBrand: "",
					lightPrice: 0.0,

				},
				hasload: false,
				imageLoad: false,
				image: "",
				selectInfo: {},
				count: 1,
			}
		},
		async mounted() {
			await this.getSearchInfo()
			var code = this.$route.params.code
			this.lightCode = code
			await this.fetch(code)
			this.hasload = true
		},
		async activated() {
			if (this.hasload == true) {
				this.hasload = false
				var code = this.$route.params.code
				await this.fetch(code)
				this.hasload = true
			}
		},
		methods: {
			async getSearchInfo() {
				await this.$axios.get('/controller/light/info').then((res) => {
					this.selectInfo = res.data
				}).catch((err) => {
					console.log(err)
				})
			},
			addShoppingCartBtn(){
				this.$axios.post("/user/addUserCar",this.$qs.stringify({
					lightCode: this.lightCode,
					lightNumber: this.count
				})).then((res)=>{
					if (res.data.code == 0){
						this.showNotice(true,"成功添加到购物车")
					}else{
						this.showNotice(false,"添加购物车失败")
					}
				}).catch((err)=>{
					this.showNotice(false,"错误：" + err)
				})
			},
			buyNow(){
				var codes = new Array()
				var numbers = new Array()
				codes.push(this.lightCode)
				numbers.push(this.count)
				this.$router.push({ path: '/home/buypage', query: { codes: codes, numbers:numbers }})
			},
			showNotice (ok,text) {
				if(ok){
					this.$Notice.success({
					    title: '成功',
					    desc: text
					});
				}else{
					this.$Notice.error({
					    title: '失败',
					    desc: text
					});
				}
			    
			},
			async fetch(code) {
				await this.$axios.post("light/info/" + code).then(async (res) => {
					const data = res.data.datas[0]
					this.light.lightBrand = this.selectInfo.brands[data.light_brand].Label
					this.light.lightStuff = this.selectInfo.stuffs[data.light_stuff].Label
					this.light.lightStyle = this.selectInfo.styles[data.light_style].Label
					this.light.lightType = this.selectInfo.types[data.light_type].Label
					this.light.light_descript = data.light_descript
					this.light.light_name = data.light_name
					this.light.lightPrice = data.light_price
					if (data.image_path != "") {
						this.image = await (async () => {
							var img = ""
							await this.$axios.get("/assets/light/" + data.image_path, {
								responseType: "arraybuffer"
							}).then((res) => {
								var imagedata = res.data
								img = 'data:image/png;base64,' + btoa(new Uint8Array(imagedata).reduce((imagedata, byte) => imagedata +
									String.fromCharCode(byte), ''))

							}).catch((err) => {
								console.log(err)
								img = null
							})
							return img
						})()
					} else {
						this.image = null
					}
					this.imageLoad = true
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
