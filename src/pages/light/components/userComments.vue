<template>
	<Card title="灯饰评论">
		<Button slot="extra" :disabled="commentShow" @click="ShowComment()">获取用户评论</Button>
		<div v-if="commentShow">
			<Scroll :on-reach-bottom="handleReachBottom">
				<Card v-for="(item, index) in userComments" :key="index" style="margin: 32px 0">
					<p slot="title">{{item.userName}}</p>
					<Row>
						<Col span="5">
							<Picture :headertype="1" :type="'user'" :path="item.path" ></Picture>
						</Col>
						<Col span="18" offset="1">
							{{item.comments}}
						</Col>
					</Row>
					<p>评论时间：{{item.commentDate}}</p>
				</Card>
			</Scroll>
		</div>
	</Card>
</template>

<script>
	import Picture from '@/pages/components/Picture'
	export default {
		components: {
			Picture
		},
		props: {
			lightCode: {
				type: String,
			},
		},
		data() {
			return {
				commentShow:false,
				userComments: [],
				page: 0,
			}
		},
		mounted() {

		},
		methods: {
			handleReachBottom() {
				this.page++
				this.getComments()
			},
			ShowComment(){
				this.commentShow = true
				this.getComments()
			},
			getComments() {
				this.$axios.post("/light/lightComments", this.$qs.stringify({
					page: this.page,
					lightCode: this.lightCode
				})).then((res) => {
					if (res.data.code == 0) {
						this.userComments = this.userComments.concat(res.data.datas)
					} else {
						this.$Notice.errpr({
							title: '获取评价失败',
							desc: "因未知原因获取评论失败"
						});
					}

				}).catch((err) => {
					this.$Notice.errpr({
						title: '错误',
						desc: err
					});
				})
			}
		},
	}
</script>

<style>
</style>
