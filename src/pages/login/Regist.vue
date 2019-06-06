<template>
	<div style="padding-top: 200px;">
		<Row>
			<Col span="8" offset="8">
				<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
					<FormItem label="用户名" prop="userName">
						<Input type="text" v-model="formCustom.userName" number><Icon type="ios-person-outline" slot="prepend"></Icon></Input>
					</FormItem>
					<FormItem label="密码" prop="password">
						<Input type="password" v-model="formCustom.password"><Icon type="ios-lock-outline" slot="prepend"></Icon></Input>
					</FormItem>
					<FormItem label="确认密码" prop="rePassword">
						<Input type="password" v-model="formCustom.rePassword"><Icon type="ios-lock-outline" slot="prepend"></Icon></Input>
					</FormItem>
					<FormItem>
						<Button type="primary" @click="handleSubmit('formCustom')">注册</Button>
						<Button @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
					</FormItem>
				</Form>
			</Col>
		</Row>
		
	</div>
</template>
<script>
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.formCustom.rePassword !== '') {
						// 对第二个密码框单独验证
						this.$refs.formCustom.validateField('rePassword');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value != this.formCustom.password) {
					callback(new Error('两次输入的密码不匹配！'));
				} else {
					callback();
				}
			};
			const validateuserName = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('用户名不能为空'));
				}
				// 模拟异步验证效果
				setTimeout(() => {
					callback();
				}, 1000);
			};

			return {
				formCustom: {
					passwd: '',
					passwdCheck: '',
					userName: ''
				},
				ruleCustom: {
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					rePassword: [{
						validator: validatePassCheck,
						trigger: 'blur'
					}],
					userName: [{
						validator: validateuserName,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.$axios.post('/user/regist',this.$qs.stringify({
							userName:this.formCustom.userName,
							password:this.formCustom.password,
							rePassword:this.formCustom.rePassword
						})).then((res)=>{
							if (res.data.code == 0){
								this.$Message.success("注册成功")
								setTimeout(()=>{
									this.$router.push('/')
								},1000)
							}else{
								this.$Message.error("注册失败可能是用户名重复了")
							}
						}).catch((err)=>{
							this.$Message.warning("发生未知错误")
						})
					} else {
						this.$Message.error('Fail!');
					}
				})
			},
			handleReset(name) {
				this.$refs[name].resetFields();
			}
		}
	}
</script>
