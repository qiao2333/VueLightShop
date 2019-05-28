<template>
	<div>
		<Spin v-if="hasload == false" fix>加载中...</Spin>
        <FormItem  v-else label="地址">
            <Cascader :data="options" :value="myValue" @on-change="valueChange" :load-data="loadData"></Cascader>
        </FormItem>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Array,
				default: null
			},
		},
		data() {
			return {
				myValue: [],
				newValue:[],
				options: null,
				hasload:false,
				load:false,
			}
		},
		methods: {
			valueChange(value){
				this.newValue = value
			},
			getValue(){
				return this.newValue
			},
			loadData(item, callback){
				item.loading = true;
				switch(item.value.toString().length){
					case 2:this.getCity(item.value,item,callback);break;
					case 4:this.getArea(item.value,item,callback);break;
					case 6:this.getStreet(item.value,item,callback);break;
				}
			},
			getState(){
				this.$axios.get("/address/state").then((res)=>{
					const datas = res.data.datas
					var options = new Array() 
					for (var i = 0; i < datas.length; i++){
						var object = new Object()
						object.label = datas[i].label
						object.value = datas[i].value
						object.children = []
                        object.loading = false
						options[i] = object
					}
					this.options = options
					this.hasload = true
				}).catch((err)=>{
					console.log(err)
				})
			},
			getCity(code,item,callback){
				this.$axios.get("/address/city/"+code).then((res)=>{
					const datas = res.data.datas
					var options = new Array() 
					for (var i = 0; i < datas.length; i++){
						var object = new Object()
						object.label = datas[i].label
						object.value = datas[i].value
						object.children = []
				        object.loading = false
						options[i] = object
					}
					item.children = options
					item.loading = false
					callback()
				}).catch((err)=>{
					console.log(err)
				})
			},
			getArea(code,item,callback){
				this.$axios.get("/address/area/"+ code).then((res)=>{
					const datas = res.data.datas
					var options = new Array() 
					for (var i = 0; i < datas.length; i++){
						var object = new Object()
						object.label = datas[i].label
						object.value = datas[i].value
						object.children = []
				        object.loading = false
						options[i] = object
					}
					item.children = options
					item.loading = false
					callback()
				}).catch((err)=>{
					console.log(err)
				})
			},
			getStreet(code,item,callback){
				this.$axios.get("/address/street/" + code).then((res)=>{
					const datas = res.data.datas
					var options = new Array() 
					for (var i = 0; i < datas.length; i++){
						var object = new Object()
						object.label = datas[i].label
						object.value = datas[i].value
						options[i] = object
					}
					item.children = options
					item.loading = false
					callback()
				}).catch((err)=>{
					console.log(err)
				})
			},
			async update(fuck){
				this.newValue = fuck
				if(fuck == null){
					this.getState()
				}
				else{
					await this.$axios.get("/address/getAll/" + fuck[0] + "/" + fuck[1] + "/" + fuck[2] ).then(async(res)=>{
						const states = res.data.states
						const cities = res.data.cities
						const areas = res.data.areas
						const streets = res.data.streets
						
						
						var option1 = new Array()
						for(var i = 0; i < states.length; i++){
							var option = new Object()
							option.value = states[i].value
							option.label = states[i].label
							option.loading = false
							if (states[i].code == fuck[0]){
								option.children = cities
							}else{
								option.children = []
							}
							option1.push(option)
						}
						
						var option2 = new Array()
						for(var i = 0; i < cities.length; i++){
							var option = new Object()
							option.value = cities[i].value
							option.label = cities[i].label
							option.loading = false
							if (cities[i].code == fuck[1]){
								option.children = areas
							}else{
								option.children = []
							}
							option2.push(option)
						}
						var option3 = new Array()
						for(var i = 0; i < areas.length; i++){
							var option = new Object()
							option.value = areas[i].value
							option.label = areas[i].label
							option.loading = false
							if (areas[i].code == fuck[2]){
								option.children = streets
							}else{
								option.children = []
							}
							option3.push(option)
						}
						var option4 = new Array()
						for(var i = 0; i < streets.length; i++){
							var option = new Object()
							option.value = streets[i].value
							option.label = streets[i].label
							option4.push(option)
						}
						this.options = option1
						this.myValue = this.value
						this.hasload = true
					}).catch((err)=>{
						console.log(err)
					})
					
				}
				
			}
		},
		mounted(){
			if (this.value != null){
				this.update(this.value)
				this.AddressModel = false
			}else{
				this.myValue = []
				this.AddressModel = true
				this.getState()
			}
			
		}
		
	}
</script>

<style>
</style>
