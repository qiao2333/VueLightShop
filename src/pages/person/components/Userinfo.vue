<template>
	<div >
		<div>
			<Card title="用户基本信息">
				<a href="#" slot="extra" @click="modalshow = true">
					<Icon type="ios-loop-strong"></Icon>
					修改
				</a>
				性别:{{Sexs[userinfo.userSex]}}<br />
				邮箱:{{userinfo.userEmail}}<br />
				手机号:{{userinfo.userPhone}}<br />
				邮政编码:{{userinfo.userCode}}<br />
			</Card>
		</div>
		<div>
			<Modal v-model="modalshow" :loading="loading" @on-ok="ok" @on-cancel="cancel">
				<Form :model="formItem">
					<FormItem label="用户性别">
						<Select v-model="formItem.userSex">
							<Option value="0">不详</Option>
							<Option value="1">男</Option>
							<Option value="2">女</Option>
						</Select>
					</FormItem>
					<FormItem label="邮箱">
						<Input v-model="formItem.userEmail" />
					</FormItem>
					<FormItem label="手机号">
						<Input  v-model="formItem.userPhone" />
					</FormItem>
					<FormItem label="邮政编码">
						<Input v-model="formItem.userCode" />
					</FormItem>
				</Form>
			</Modal>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				loading:false,
				modalshow: false,
				reload:false,
				Sexs:["不详","男","女"],
				formItem: {
					userSex: "",
					userEmail: "",
					userPhone: "",
					userCode: "",
				}
			}
		},
		props: {
			userinfo: {
				type: Object,
			},
		},
		mounted() {
			this.formItem.userSex = this.userinfo.userSex
			this.formItem.userEmail = this.userinfo.userEmail
			this.formItem.userPhone = this.userinfo.userPhone
			this.formItem.userCode = this.userinfo.userCode
		},
		methods: {
			ok() {
				this.loading = true
				this.$axios.post("/user/UserInfoUpdate", this.$qs.stringify({
					data:this.formItem
				})).then((res)=>{
					if (res.data.code == 0){
						this.$emit("notify",true,"修改成功")
					}else{
						this.$emit("notfiy",false,"修改失败")
					}
				}).catch((err)=>{
					this.$emit("notify",false,"出现未知错误" + err)
				})
			},
			cancel(){
				this.modalshow = false
			}
		},
	}
</script>

<style>
</style>
