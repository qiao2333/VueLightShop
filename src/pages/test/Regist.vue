<template>
	<div style="text-align: center;height: 1000px;width: 1000px;padding-left: 500px;padding-top: 300px;">
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
			<FormItem label="用户名" prop="userName">
				<Input type="text" v-model="formCustom.userName" number><Icon type="ios-person-outline" slot="prepend"></Icon></Input>
			</FormItem>
			<FormItem label="密码" prop="passwd">
				<Input type="password" v-model="formCustom.passwd"><Icon type="ios-lock-outline" slot="prepend"></Icon></Input>
			</FormItem>
			<FormItem label="确认密码" prop="passwdCheck">
				<Input type="password" v-model="formCustom.passwdCheck"><Icon type="ios-lock-outline" slot="prepend"></Icon></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formCustom')">注册</Button>
				<Button @click="handleReset('formCustom')" style="margin-left: 8px">取消</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.formCustom.passwdCheck !== '') {
						// 对第二个密码框单独验证
						this.$refs.formCustom.validateField('passwdCheck');
					}
					callback();
				}
			};
			const validatePassCheck = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.formCustom.passwd) {
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
					passwd: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					passwdCheck: [{
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
						this.$Message.success('Success!');
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
