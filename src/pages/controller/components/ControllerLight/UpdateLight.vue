<template>
	<div>
		<Spin v-if="load" />
		<Tabs v-else value="light">
			<TabPane label="修改灯饰" name="light">
				<Form :model="formItem">
					<FormItem label="灯饰名称">
						<Input v-model="formItem.name" placeholder="请输入灯饰名称" />
					</FormItem>
					<FormItem label="灯饰风格">
						<Select v-model="formItem.style">
							<Option v-for="(item, index) in selectInfo.styles" :key="index" :value="item.Code">{{item.Label}}</Option>
						</Select>
					</FormItem>
					<FormItem label="灯饰材质">
						<Select v-model="formItem.stuff">
							<Option v-for="(item, index) in selectInfo.stuffs" :key="index" :value="item.Code">{{item.Label}}</Option>
						</Select>
					</FormItem>
					<FormItem label="灯饰类型">
						<Select v-model="formItem.type">
							<Option v-for="(item, index) in selectInfo.types" :key="index" :value="item.Code">{{item.Label}}</Option>
						</Select>
					</FormItem>
					<FormItem label="灯饰品牌">
						<Select v-model="formItem.brand">
							<Option v-for="(item, index) in selectInfo.brands" :key="index" :value="item.Code">{{item.Label}}</Option>
						</Select>
					</FormItem>
					<FormItem label="灯饰颜色">
						<Input v-model="formItem.color" placeholder="请输入灯饰颜色" />
					</FormItem>
					<FormItem label="灯饰价格">
						<InputNumber size="large" v-model="formItem.price" :step="0.01" placeholder="请输入灯饰名称" />
					</FormItem>
					<FormItem label="灯饰库存量">
						<InputNumber size="large" v-model="formItem.count" placeholder="请输入灯饰库存量" />
					</FormItem>
					<FormItem label="灯饰说明">
						<Input v-model="formItem.descript" type="textarea" placeholder="请输入灯饰说明" />
					</FormItem>
					<Button type="primary" @click="handleSubmit">提交</Button>
					<Button type="error" html-type="reset">重置</Button>
				</Form>
			</TabPane>
			<TabPane label="修改图片" name="picture">
				<ImageUpload @tip="tip" :cover="cover" :lightCode="code" :images="images" />
			</TabPane>
		</Tabs>

	</div>
</template>

<script>
	import ImageUpload from './ImageUpload'
	export default {
		name: 'UpdateLightUnKeep',
		components: {
			ImageUpload
		},
		data() {
			return {
				hasload: false,
				formItem: {
					name: '',
					brand: '',
					style: '',
					stuff: '',
					type: '',
					price: 0,
					count: 0,
					color: '',
					descript: '',
				},
				load:true,
				code:0,
				selectInfo: {},
				images: [],
				cover: null,
			}
		},
		async mounted() {
			var code = this.$route.query.code
			await this.getinfo()
			this.fetch(code)
			setTimeout(()=>{
				this.load= false
			},1000)
		},
		methods: {
			fetch(code) {
				this.$axios.get("/controller/light/imageAndDate/" + code).then((res) => {
					if (res.data.code == 0) {
						var data = res.data.light
						this.formItem.name = data.name
						this.formItem.color = data.color
						this.formItem.brand = data.brand
						this.formItem.count = data.count
						this.formItem.price = data.price
						this.formItem.style = data.style
						this.formItem.type = data.type
						this.formItem.stuff = data.stuff
						this.formItem.descript = data.descript
						this.code = data.code
						if (res.data.images != null) {
							var images = new Array()
							images = images.concat(res.data.images)
							for (var i = 0; i < images.length; i++) {
								if (images[i].cover == "1") {
									this.cover = images.splice(i, 1)[0]
								}
							}
							this.images = images
						}
						console.log(this.cover)
						console.log(this.images)
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			getinfo() {
				this.$axios.get('/controller/light/info').then((res) => {
					this.selectInfo = res.data
				}).catch((err) => {
					console.log(err)
				})
			},
			handleSubmit() {
				this.$axios.post("/controller/light/update/" + this.code, this.$qs.stringify(
					this.formItem
				)).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"修改成功"})
					}else{
						this.$emit("tip",{type:"error",text:"修改失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"发生未知错误"})
				})
			},
			tip(data){
				this.$emit("tip",data)
			}
		},
	}
</script>

<style>
</style>
