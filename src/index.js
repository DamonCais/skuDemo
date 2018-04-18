import sku from './sku.vue';
export default sku;
//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component('sku', sku);
}