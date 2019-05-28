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
						<ButtonGroup slot="extra">
							<Button  @click="UpdateAddress(item)">
								修改
							</Button>
							<Button  @click="DeleteAddress(item,index)">
								删除
							</Button>
						</ButtonGroup>
						
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
							this.$emit("tip",{type:"success",text:"添加成功"})
						}else{
							this.$emit("tip",{type:"error",text:"添加失败"})
						}
					}).catch((err)=>{
						this.$emit("tip",{type:"warning",text:"出现未知错误"})
					})
				}else{
					await this.$axios.post("/user/UpdateUserAddress", this.$qs.stringify({
						content:this.formItem.content,
						addresses: value,
						code: this.formItem.code
					})).then( (res)=>{
						if(res.data.code == 0){
							this.$emit("tip",{type:"success",text:"修改成功"})
						}else{
							this.$emit("tip",{type:"error",text:"修改失败"})
						}
					}).catch((err)=>{
						this.$emit("tip",{type:"warning",text:"出现未知错误"})
						
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
			DeleteAddress(item,index){
				this.$axios.get("/user/deleteUserAddress/" + item.code).then((res)=>{
					if (res.data.code == 0){
						this.$emit("tip",{type:"success",text:"删除成功"})
						this.addresses.splice(index,1)
					}else{
						this.$emit("tip",{type:"error",text:"修改失败"})
					}
				}).catch((err)=>{
					this.$emit("tip",{type:"warning",text:"出现未知错误"})
				})
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
