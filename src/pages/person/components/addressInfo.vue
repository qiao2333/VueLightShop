<template>
	<div>
		<Spin v-if="load" />
		<div v-else>
			<Card title="收货地址">
				<Button type="primary" slot="extra" @click="AddAddress">
					添加新地址
				</Button>
				<template v-for="(item, index) in addresses">
					<Card :key="index">
						<Button slot="extra" @click="UpdateAddress(item)">
							修改
						</Button>
						{{item.state + "/" + item.city + "/" + item.area + "/" + item.street}}<br />
						说明:{{item.content}}
					</Card>
				</template>
			</Card>
			<Modal v-model="showModal" :loading="loading" @on-ok="ok" @on-cancel="cancel">
				<Form  :model="formItem"  v-if="formload">
					<AddressSelect ref="AddressSelect" :value="formItem.address"></AddressSelect>
					<FormItem label="说明">
						<Input type="textarea" v-model="formItem.content" />
					</FormItem>
				</Form>
			</Modal>
		</div>
	</div>
</template>

<script>
	import AddressSelect from "@/pages/components/addressSelect"
	export default {
		data() {
			return {
				AddressModel: true, // true为添加 false为修改
				loading:false,
				load: true,
				formload:false,
				formItem:{
					code:"",
					address:[],
					cotent:"",
				},
				showModal:false,
				addresses: [],
			}
		},
		components: {
			AddressSelect
		},
		mounted() {
			this.fetch()
		},
		methods: {
			async ok(){
				this.loading = true
				var value = this.$refs.AddressSelect.getValue()
				this.formload = false
				if (this.AddressModel == true){
					await this.$axios.post("/user/AddUserAddress", this.$qs.stringify({
						content:this.formItem.content,
						addresses: value,
					})).then((res)=>{
						if(res.data.code == 0){
							this.$emit("notify",true,"添加成功")
						}else{
							this.$emit("notify",false,"添加失败")
						}
					}).catch((err)=>{
						this.$emit("notify",false,"出现未知错误" + err)
					})
				}else{
					await this.$axios.post("/user/UpdateUserAddress", this.$qs.stringify({
						content:this.formItem.content,
						addresses: value,
						code: this.formItem.code
					})).then( (res)=>{
						if(res.data.code == 0){
							this.$emit("notify",true,"修改成功")
						}else{
							this.$emit("notify",false,"修改失败")
						}
					}).catch((err)=>{
						this.$emit("notify",false,"出现未知错误" + err)
						
					})
				}
				this.reload()
			},
			
			reload(){
				this.loading = false
				this.fetch()
			},
			
			cancel(){
				this.formload = false
			},
			fetch() {
				this.$axios.get("/user/UserAddressInfo").then((res) => {
					if (res.data.code == 0) {
						this.addresses = res.data.datas
					}
					this.load = false
				}).catch((err) => {
					console.log(err)
				})
			},
			UpdateAddress(value){
				this.formload = true
				this.AddressModel = false
				var addressArray = new Array()
				addressArray.push(Number(value.stateCode))
				addressArray.push(Number(value.cityCode))
				addressArray.push(Number(value.areaCode))
				addressArray.push(Number(value.streetCode))
				this.formItem.code = value.code
				this.formItem.address = addressArray
				this.formItem.content = value.content
				this.showModal = true
			},
			AddAddress(){
				this.formload = true
				this.AddressModel = true
				this.formItem.address = null
				this.formItem.content = ""
				this.showModal = true
			}
		},
	}
</script>

<style>
</style>
