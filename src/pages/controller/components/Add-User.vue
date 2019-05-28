<template>
	<div>
		<Form>
			<FormItem :model="FormItem1" label="用户名">
				<Input v-model="FormItem1.userName" placeholder="请输入用户名"/>
			</FormItem>
			<FormItem :model="FormItem1" label="密码">
				<Input v-model="FormItem1.password" placeholder="请输入用户名"/>
			</FormItem>
			<FormItem :model="FormItem1" label="用户类型">
				<Select v-model="FormItem1.userType">
					<Option value="1">职员</Option>
					<Option value="2">管理员</Option>
				</Select>
			</FormItem>
			<Button type="primary" @click="handleSubmit">提交</Button>
		</Form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				FormItem1: {
					userName:'',
					password:'',
					userType:2,
				}
			}
		},
		methods: {
			handleSubmit() {
				this.$axios.post('/controller/user/add',this.$qs.stringify(this.FormItem1)).then((res)=>{
					console.log(res)
				}).catch((err)=>{
					console.log(err)
				})
			}
		},
	}
</script>

<style>
</style>
