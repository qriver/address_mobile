<template>
	<div id="login " class="estate-page">
		<router-view></router-view>
	</div>
</template>

<script>
	// @ is an alias to /src

	import {
		estatePlatePrefixList,
		estateAttachedPlateSuffixList,
		estatePlateSuffixList,
		buildingPlatePrefixList,
		buildingPlateSuffixList,
		buildingAttachedPlateSuffixList
	} from '@/api/type/dictionary.js';
	// import { userObject } from '@/api/type/user.js';
	// import { Toast } from 'vant';
	// import 'vant/lib/toast/style';

	export default {
		name: 'login',
		data() {
			return {
				//用户单位，控制数据显示范围
				user: {},
				dictionary: {}
			};
		},
		created: function() {
			const params = Object.assign({}, params, {
				//修改为从url参数中获取
				userId: '057249',
				role: 'worker'
			});
			// this.user = new userObject();
			this.dictionary.estatePlatePrefixList = estatePlatePrefixList;
			this.dictionary.estateAttachedPlateSuffixList = estateAttachedPlateSuffixList;
			this.dictionary.estatePlateSuffixList = estatePlateSuffixList;
			this.dictionary.buildingPlatePrefixList = buildingPlatePrefixList;
			this.dictionary.buildingPlateSuffixList = buildingPlateSuffixList;
			this.dictionary.buildingAttachedPlateSuffixList = buildingAttachedPlateSuffixList;

			this.$api.dictionary.getMyStreet(params).then(
				res => {
					Promise.resolve(res.data);
					this.dictionary.streetList = res.data.result.myStreetList;
					sessionStorage.setItem('dictionary', JSON.stringify(this.dictionary));
					// this.dictionary = JSON.parse(sessionStorage.getItem('dictionary'));
				},
				err => {
					window.console.log(err.data);
				}
			);

			this.$api.user.getUserDetail(params).then(
				res => {
					Promise.resolve(res.data);
					// var role = this.$route.query.role;
					// //window.console.log(role);
					// if (role !== undefined) {
					//   res.data.result.role = role;
					// }

					this.$store.commit('user/setUser', res.data.result);
					this.$router.push('/estate');
				},
				err => {
					// Toast({
					//   message: err.data,
					//   duration: 1000,
					//   forbidClick: true
					// });
					window.console.log(err.data);
				}
			);
		},
		mounted() {
			//从url参数中获取用户ID
			//  params.deptId=this.$route.query.userId;
			//根据用户ID获取用户信息，并保存到vuex.store
			// window.console.log('store');
		}
	};
</script>
