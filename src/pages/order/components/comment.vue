<template>
	<div>
		<div v-if="load">
			<Spin />
		</div>
		<div v-else>
			<Card title="邮递信息">
				<h1>地址:{{address.address}}</h1>
				<h2>详细:{{address.content}}</h2>
				<h2>邮寄类型:{{row.postType}}</h2>
				<h2>邮寄费用:{{row.postFee}}</h2>
			</Card>
			<Card title="商品列表">
				<ButtonGroup slot="extra">
					<Button type="primary" @click="ignot">评论</Button>
					<Button type="error" @click="comit">忽略</Button>
				</ButtonGroup>
				<Card v-for="(item, index)  in shoplist" :key="index">
					<Row>
						<Col span="4">
						<a :href="'/#/home/info/' + item.lightCode">
							<Picture :path="item.path" :headertype="3" />
							{{item.lightName}}
						</a>
						</Col>
						<Col span="4">
						<h2>价格:{{item.lightPrice}}</h2>
						</Col>
						<Col span="4">
						<h2>数量:{{item.number}}</h2>
						</Col>
						<Col span="12">
						<h2>商品评论：</h2>
						<Input type="textarea" v-model="comments[index]" :rows="4" placeholder="请输入商品评论,空则为忽略"/>
						
						</Col>
					</Row>
					
				</Card>
				
			</Card>
		</div>
	</div>
</template>

<script>
	import Picture from '@/pages/components/Picture'
	export default {
		props: {
			row: {
				type: Object,
			}
		},
		components: {
			Picture
		},
		data() {
			return {
				load: true,
				address: null,
				shoplist: [],
				comments:[],
			}
		},
		mounted() {
			console.log(this.row)
			this.fetch(this.row.code, this.row.addressCode)
		},
		methods: {
			fetch(code, addressCode) {
				this.$axios.get("/user/OrderInfo/" + code + "/" + addressCode).then((res) => {
					if (res.data.code == 0) {
						console.log(res.data)
						this.address = res.data.data1[0]
						this.shoplist = res.data.data2
						this.load = false
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			ignot(){
				this.comment([],[])
			},
			comit(){
				var codes = new Array()
				var comments = new Array()
				for (var i = 0; i < this.comments.length; i++){
					if (this.comments[i] != null){
						comments.push(this.comments[i])
						codes.push(this.shoplist[i].lightCode)
					}
				}
				this.comment(codes,comments)
			},
			comment(codes,comments){
				const code = this.row.code
				this.$axios.post("/user/userComment/" + code,this.$qs.stringify({
					codes:codes,
					comments:comments,
				},{
					indices:false
				})).then((res)=>{
					this.$emit("comment",res.data.code)
				}).catch((err)=>{
					this.$emit("comment",-2)
				})
			}
		}
	}
</script>

<style>
</style>
