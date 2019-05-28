<template>
	<div>
		<Spin v-if="hasload==false"/>
		<div v-else>
			<Form :model="formItem" >
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
					<InputNumber size="large"  v-model="formItem.price" :step="0.01" placeholder="请输入灯饰名称" />
				</FormItem>
				<FormItem label="灯饰库存量">
					<InputNumber size="large"  v-model="formItem.count"  placeholder="请输入灯饰库存量" />
				</FormItem>
				<FormItem label="灯饰说明">
					<Input v-model="formItem.descript"  type="textarea" placeholder="请输入灯饰说明" />
				</FormItem>
				<Button type="primary" @click="handleSubmit">提交</Button>
				<Button type="error" html-type="reset">重置</Button>
			</Form>
		</div>
	</div>
</template>

<script>
	export default{
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
					count:0,
					color: '',
					descript: '',
				},
				selectInfo:{}
			}
		},
		mounted(){
			this.Fetch()
			this.hasload = true
		},
		methods: {
			Fetch() {
				this.$axios.get('/controller/light/info').then((res)=>{
					this.selectInfo = res.data
				}).catch((err)=>{
					console.log(err)
				})
			},
			handleSubmit(){
				console.log(this.formItem)
				this.$axios.post('/controller/light/add',this.$qs.stringify(this.formItem)).then((res)=>{
					const data = res.data
					if(data.code == -1){
						this.open()
					}else{
						this.$emit("next",data.LightCode)
					}
				}).catch((err)=>{
					console.log(err)
				})
			},
			open(){
                this.$Notice.open({
                    title: '添加失败',
                });
			}
		},
	}
</script>

<style>
</style>
