<template>
	<div v-if="hasload">
		<div style=" text-align: center;padding-top: 30px;">
			<Carousel autoplay loop>
				<CarouselItem>
					<div style="text-align: center;"><img style="height: 450px;width: 100%;" src="../../assets/1.jpg" /></div>
				</CarouselItem>
				<CarouselItem>
					<div style="text-align: center;"><img style="height: 450px;width: 100%;" src="../../assets/2.jpg" /></div>
				</CarouselItem>
				<CarouselItem>
					<div style="text-align: center;"><img style="height: 450px;width: 100%;" src="../../assets/3.jpg" /></div>
				</CarouselItem>
				<CarouselItem>
					<div style="text-align: center;"><img style="height: 450px;width: 100%;" src="../../assets/4.jpg" /></div>
				</CarouselItem>
				<CarouselItem>
					<div style="text-align: center;"><img style="height: 450px;width: 100%;" src="../../assets/5.jpg" /></div>
				</CarouselItem>
			</Carousel>
		</div>
		<Row type="flex" justify="end">
			<Col span="4">
			<Input size="large" @on-search="search" v-model="name" search enter-button placeholder="输入你要搜索的商品" />
			</Col>
			<Col span="2">
			<Button type="primary" size="large" @click="drawerOpen=true">高级搜索</Button>
			</Col>
		</Row>
		<div>
			<Drawer title="Create" v-model="drawerOpen" width="360" :mask-closable="false">
				<Form :model="formItem">
					<Row>
						<Col>
						<FormItem label="灯饰名称">
							<Input v-model="formItem.light_name" placeholder="请输入灯饰名称" />
						</FormItem>
						<FormItem label="灯饰风格">
							<Select v-model="formItem.light_style">
								<Option v-for="(item, index) in selectInfo.styles" :key="index" :value="item.Code">{{item.Label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="灯饰材质">
							<Select v-model="formItem.light_stuff">
								<Option v-for="(item, index) in selectInfo.stuffs" :key="index" :value="item.Code">{{item.Label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="灯饰类型">
							<Select v-model="formItem.light_type">
								<Option v-for="(item, index) in selectInfo.types" :key="index" :value="item.Code">{{item.Label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="灯饰品牌">
							<Select v-model="formItem.light_brand">
								<Option v-for="(item, index) in selectInfo.brands" :key="index" :value="item.Code">{{item.Label}}</Option>
							</Select>
						</FormItem>
						<FormItem label="排序">
							<RadioGroup v-model="formItem.order" @on-change="orderChange">
								<Radio label="">无</Radio>
								<Radio label="a.light_price">价格</Radio>
								<Radio label="c.store_count">收藏</Radio>
								<Radio label="c.sale_count">销售</Radio>
							</RadioGroup>

						</FormItem>
						<FormItem label="升降序">
							<Select v-model="formItem.orderSelect" :disabled="swichdisable" style="width:100px">
								<Option value="asc">升序</Option>
								<Option value="desc">降序</Option>
							</Select>
						</FormItem>
						</Col>
					</Row>
					<ButtonGroup>
						<Button @click="heightSearch">提交</Button>
					</ButtonGroup>
				</Form>
			</Drawer>
		</div>
		<div v-if="searchLoad">
			<Row  justify="center" type="flex" class="code-row-bg">
				<template v-for="(item, index) in light">
					<Col :key="index" :lg="{ span: 5}">
					<a :key="index" :href="'/#/home/info/' + item.code">
						<Card>
							<div style="text-align:center">
								<img v-if="item.image_path!=null" style="height: 100px;width: 100px;" :src="item.image_path">
								<img v-else style="height: 100px;width: 100px;" src="@/assets/dog.jpg">
								<p>{{item.light_name}}</p>
								<p>{{item.light_price}}</p>
							</div>
						</Card>
					</a>
					</Col>
				</template>
			</Row>
				<div style="text-align: center;">
					<Page :page-size="12" @on-change="pageChange" :current="current" :total="total" show-elevator />
				</div>

		</div>


	</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				current:1,
				total:1,
				hasload: false,
				drawerOpen: false,
				name: "",
				formItem: {
					orderSelect: "",
					light_name: "",
					light_stuff: "",
					light_style: "",
					light_type: "",
					light_brand: "",
					order: ""
				},
				swichdisable: true,
				light: [],
				selectInfo: null,
				searchLoad: false,
				selectSearch: null,
			}
		},
		async mounted() {
			await this.Fetch()
			this.hasload = true
		},
		methods: {
			async Fetch() {
				await this.$axios.get('/controller/light/info').then((res) => {
					this.selectInfo = res.data
				}).catch((err) => {
					console.log(err)
				})
			},
			search() {
				this.searchLoad = false
				this.light = []
				this.total = 1
				this.current = 1
				this.getSearch(0)
				this.selectSearch = this.getSearch
				this.searchLoad = true
			},
			getSearch(page){
				this.$axios.post('/light/searchByName', this.$qs.stringify({
					name: this.name,
					page: page,
					pageCount: 12
				})).then(async (res) => {
					const data = res.data
					await this.work(data.datas)
					this.total=data.count
				}).catch((err) => {
					console.log(err)
				})
			},
			heightSearch() {
				this.searchLoad = false
				this.light = []
				this.total = 1
				this.current = 1
				this.getHeightSearch(0)
				this.selectSearch = this.getHeightSearch
				this.searchLoad = true
			},
			getHeightSearch(page){
				this.$axios.post("/light/SearchLight", this.$qs.stringify({
					conditions: {
						light_type: this.formItem.light_type,
						light_stuff: this.formItem.light_stuff,
						light_style: this.formItem.light_style,
						light_brand: this.formItem.light_brand
					},
					light_name: this.formItem.light_name,
					order: this.formItem.order,
					asc: this.formItem.orderSelect,
					page: page,
					pageCount: 12
				})).then(async(res) => {
					const data = res.data
					this.total=data.count
					await this.work(data.datas)
				}).catch((err) => {
					console.log(err)
				})
			},
			async work(lights){
				for (var i = 0; i < lights.length; i++) {
					var ob = new Object()
					ob.code = lights[i].code
					ob.light_name = lights[i].light_name
					ob.light_price = lights[i].light_price
					if (lights[i].image_path != "") {
						ob.image_path = await (async () => {
							var img = ""
							await this.$axios.get("/assets/light/" + lights[i].image_path, {
								responseType: "arraybuffer"
							}).then((res) => {
								var imagedata = res.data
								img = 'data:image/png;base64,' + btoa(new Uint8Array(imagedata).reduce((imagedata, byte) => imagedata +
									String.fromCharCode(byte), ''))
								
							}).catch((err) => {
								console.log(err)
								img = null
							})
							console.log(img)
							return img
						})()
					} else {
						ob.image_path = null
					}
					this.light.push(ob)
				}
			},
			orderChange(value) {
				if (value == "") {
					this.swichdisable = true
				} else {
					this.swichdisable = false
				}
			},
			pageChange(page){
				this.light = []
				this.selectSearch(page - 1)
			}
		}
	}
</script>
<style>

</style>
