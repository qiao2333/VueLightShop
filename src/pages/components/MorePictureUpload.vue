<template>
	<div>
		
		<div>
			<Row>
			<Spin v-if="!show"/>
			<div  v-else>
				<template v-for="(item,index) in file">
					<Col :key="index"  :span="3">
					<Card :key="index" >
					<Button @click="removeImage(index)" ghost type="error" slot="extra" icon="ios-close"></Button>
					<img style="height: 100px;width: 100px;" :src="item.src"  />
					<p>{{item.name}}</p>
					</Card>
					</Col>
				</template>
			</div>
			<Col span="4">
				<Card>
					<Upload type="drag" :format="['jpg','jpeg','png']"  action="" multiple :before-upload="handleUpload">
						<Button style="height: 100px;width: 100px;" icon="ios-cloud-upload-outline">上传图片</Button>
					</Upload>
				</Card>
			</Col>
			
			</Row>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				file: [],
				show:true,
			}
		},
		methods: {
			handleUpload(file) {
				var reader = new FileReader()
				var obj = new Object()
				this.show =false 
				reader.onload = function() {
					obj.src = reader.result;
				}
				if (file) {
					reader.readAsDataURL(file);
					obj.name = file.name
					obj.file = file
				} 
				this.file.push(obj)
				setTimeout(()=>{
					this.show = true
				},1000)
				
				return false
			},
			removeImage(index){
				this.file.splice(index,1)
			},
			upload(){
				var files = new Array()
				for (var i = 0; i < this.file.length; i++){
					files.push(this.file[i].file)
				}
				return files
			},
		},
	}
</script>

<style>
</style>
