<template>
	<div>
		<sku @addToCart="addToCart" v-model="show" :product="product"/>
		<button @click="show=true">打开购物车</button>
	</div>
</template>

<script>
import sku from '../dist/damon-sku.min.js'
// import sku from './sku'
export default {
	components:{
		sku,
	},
	data(){
		return{
			show:false,
			product:{
				name:'测试商品',
				price:'1.00',
				quantity:10,
				options:[{
					name:'选项一',
					price:'5.00',
					quantity:5,
				},{
					name:'这是一个选项',
					price:'4.00',
					quantity:6
				}]
			}
		}
	},
	methods:{
		addToCart(obj){
			console.log(obj);
			
		}
	}
}
</script>

<style>

</style>

