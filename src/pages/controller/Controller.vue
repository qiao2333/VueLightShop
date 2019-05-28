<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu @on-select="changePage" active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                       灯饰管理
                    </template>
                    <MenuItem name="AddLight">添加灯饰</MenuItem>
                    <MenuItem name="ControllerLight">Option 2</MenuItem>
                    <MenuItem name="ControllerUser">Option 3</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        账号管理
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        订单管理
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
				<MenuItem name="test">Option 2</MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Card>
					<component :is="currenPage" ></component>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
	import AddLight from './components/Add-light'
	import ControllerLight from './components/ControllerLight'
	import ControllerUser from './components/ControllerUser'
    export default {
        data() {
        	return {
        		currenPage: "",
        	}
        },
		methods: {
			changePage(url) {
				this.currenPage = url
			}
		},
		components: {
			AddLight,
			ControllerLight,
			ControllerUser
		},
    }
</script>
