<template>
    <Form :model="user" id="app"  :label-width="80">
		
		<FormItem label="头像">
			<Icon type="ios-body" />
		</FormItem>
		
        <FormItem label="用户名">
            <Input v-model="user.id" disabled v-show="true" placeholder="Enter something..."></Input>
        </FormItem>
		
		<FormItem label="性别">
		    <RadioGroup v-model="user.sex" >
		        <Radio label="男" disabled>男</Radio>
		        <Radio label="女" disabled>女</Radio>
		    </RadioGroup>
		</FormItem>
		
		<FormItem label="email">
		    <Input v-model="user.email" disabled v-show="true" placeholder="Enter something..."></Input>
		</FormItem>
		
		<FormItem label="code">
		    <Input v-model="user.code" disabled v-show="true" placeholder="Enter something..."></Input>
		</FormItem>
		
		
        <FormItem label="个人简介">
            <Input v-model="user.text" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
		<FormItem>
			<Button type="success">编辑</Button>
			<Button type="primary">保存</Button>
			<Button type="reselt">重置</Button>
		</FormItem>
		
		<FormItem>
			<Button type="success" v-show="true" long>修改个人信息</Button>
			<Button type="primary" v-show="true" long>保存</Button>
			<Button type="reset" v-show="true" long>重置</Button>
		</FormItem>
		
        
    </Form>
</template>
	

<script>
   export default {
        data () {
            return {
                el:'#app',
		            user:{
			            id:"id",
			            sex:"男",
			            email:"123456@qq.com",
			            phone:"12345678910",
			            code:"123",
			            text:"这个人很懒",
		              }
            }
        }
    }

	
   
</script>
