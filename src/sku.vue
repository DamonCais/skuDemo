<template>
	<div v-show="show" class="contain">
		<transition name="popup">
		<div  v-show="show" class="sku">
			<header class="header">
				<img class="img" src="https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/29f8068f-f9e5-4c7e-934c-7c076e34a413-thumb.jpg" alt="">
				<div class="info">
					<h5>{{product.name}}</h5>
					<h6 v-if="!product.options.length">￥{{product.price}}</h6>
					<h6 v-else>￥{{product.options[sel].price}}</h6>
				</div>
				<div @click="show=false" class="close">X</div>
			</header>
			<div v-if="product.options.length" class="row">
				<h5>options:</h5>
				<span @click="select(index)" v-for="(o,index) in product.options" :key="o.id" class="btn" :class="index===sel?'active':''">{{o.name}}</span>
			</div>
			<div class="row">
				<div class="step">
					<div class="left">我要买</div>
					<div class="right">
						<span @click="minus">-</span>
						<span>{{num}}</span>
						<span @click="plus">+</span>
					</div>
				</div>
				<h6  v-if="!product.options.length">库存:{{product.quantity}}</h6>
				<h6 v-else>库存:{{product.options[sel].quantity}}</h6>
			</div>

		</div>
				</transition>
		<footer class="footer">
			<div @click="addToCart">加入购物车</div>
			<div>立即购买</div>
		</footer>

	</div>
</template>

<script>
export default {
	watch:{
		value(val){
			this.show = val;
		},
		show(val){
			this.$emit('input',val);
		}
	},
	props:{
		value:{
			type:Boolean,
		},
		product:{
			type:Object
		},

	},
	data(){
		return{
			num:1,
			sel:0,
			show:this.value
		}
	},
	methods:{

		addToCart(){
			let obj = {}
			if(this.product.options.length){
				obj={
					num:this.num,
					options:this.product.options[this.sel]
				}
			}else{
				obj={
					num:this.num,
					name:this.product.name
				}
			}
			this.$emit('addToCart',obj);
		},
		select(index){
			this.sel=index;
			this.num=1;
		},
		plus(){
			if(this.product.options.length){
				this.num=this.product.options[this.sel].quantity>this.num?this.num+1:this.product.options[this.sel].quantity;
			}else{
				this.num=this.product.quantity>this.num?this.num+1:this.product.quantity;
			}
		},
		minus(){
			if(this.num>1){
				this.num--;
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.contain {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333;
  opacity: 0.8;
  z-index: 1000;
  .sku {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    height: 50%;
    margin-bottom: 50px;
    padding: 0 10px;
    .header {
      border-bottom: 1px solid #ddd;
      .img {
        position: relative;
        margin-top: -10px;
        width: 80px;
        height: 80px;
        float: left;
      }
      .info {
        padding: 10px 60px 10px 10px;
        min-height: 82px;
        overflow: hidden;
        box-sizing: border-box;
      }
      .close {
        position: absolute;
        right: 20px;
        top: 10px;
      }
    }
    .row {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      h5 {
        margin-bottom: 8px;
      }
      .btn {
        display: inline-block;
        min-width: 50px;
				margin-right: 5px;
				padding:0 3px;
        line-height: 26px;
        border: 1px solid #aaa;
        border-radius: 5px;
        text-align: center;
        &.active {
          background: red;
          color: white;
        }
      }
      .step {
        height: 30px;
        margin-right: 20px;
        line-height: 30px;
        display: block;
        overflow: hidden;
        .left {
          float: left;
        }
        .right {
          float: right;
          span {
            display: block;
            float: left;
            min-width: 26px;
            line-height: 26px;
            border: 1px solid #aaa;
            border-radius: 5px;
            text-align: center;
          }
        }
      }
    }
  }
  .footer {
    display: flex;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    color: white;
    div {
      background: #f44;
      flex: 1;
      &:nth-child(1) {
        background: #f85;
      }
    }
  }
}
.popup-enter-active{
	animation: popup .5s;
}
.popup-leave {
	animation: popup .5s reverse;
}

@keyframes popup{
	from{height:10%;}
	to{height: 50%;}
}
</style>
<style>
* {
  margin: 0;
}
</style>
