<template>
	<div id="room-portal " class="estate-page">
		<div class="estate-title my-van">
			<van-nav-bar title="房屋详细信息" left-text="返回" @click-left="onClickReturn">
				<van-icon size="25" class-prefix="my-icon" name="arrow-left" slot="left" />
			</van-nav-bar>
		</div>

		<div class="estate-main">
			<van-tabs v-model="active">
				<!-- 门牌 -->
				<van-tab title="产权信息">
					<van-row style="margin-top:10px;">
						<van-field
							label="产权人:"
							required
							input-align="right"
							placeholder="请输入土地证登记项目名称"
						/>
						<van-field
							label="产权证号:"
							required
							input-align="right"
							placeholder="请输入土地证登记使用单位"
						/>
					</van-row>

					<van-row style="margin-top:10px;">
						<van-field label="幢号:" input-align="right" placeholder="请输入用地位置" />
						<van-field label="结构:" input-align="right" placeholder="请输入宗地号" />
						<van-field label="房屋总层数:" input-align="right" placeholder="请输入建筑性质" />
						<van-field label="所在层数:" input-align="right" placeholder="请输入立项时间" />
						<van-field label="建筑面积:" input-align="right" placeholder="请输入建筑面积" />
						<van-field label="设计用途:" input-align="right" placeholder="请输入建筑功能" />
					</van-row>
					<div style="width: 100%;height:60px;"></div>
					<div v-show="this.$store.state.user.role == 'worker'" class="estate-footer">
						<!-- <van-row v-show="this.$store.state.user.role == 'worker'" style="width:100%;margin-bottom:2px;margin-right:10px; "> -->
						<van-button
							style=" height:100%;width:100%;margin-right:10px"
							@click="onSaveClick()"
							plain
							type="info"
						>
							保存</van-button
						>

						<van-button
							v-show="!isAddnew"
							plain
							type="info"
							color="#ff976a"
							style=" height:100%;width:100%;margin-right:10px"
							block
							@click="onDeleteClick()"
						>
							删除</van-button
						>
						<!-- </van-row> -->
					</div>
				</van-tab>

				<van-tab title="实有人口"> </van-tab>
				<van-tab title="实有单位"> </van-tab>
			</van-tabs>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
	//import estateSummary from '@/components/estate/estate-summary.vue';
	import { NavBar, Field, Button, Row, Col, Cell, Tabs, Tab, Icon, Switch } from 'vant';
	import 'vant/lib/nav-bar/style';
	import 'vant/lib/tabs/style';
	import 'vant/lib/tab/style';
	import 'vant/lib/field/style';
	import 'vant/lib/button/style';
	import 'vant/lib/cell/style';
	import 'vant/lib/cell-group/style';
	import 'vant/lib/row/style';
	import 'vant/lib/col/style';
	import 'vant/lib/switch/style';

	export default {
		name: 'estate-edit',
		data() {
			return {
				active: 0,
				objEstate: {},
				action: ''
			};
		},
		created: function() {
			this.action = this.$route.params.action;
			// var estate_id = this.$route.params.estate_id;
			// window.console.log(this.action);

			if (this.action === 'Addnew') {
				//
			}
			if (this.action === 'edit') {
				//  this.objEstate = JSON.parse(sessionStorage.getItem('estate'));
			}
		},
		computed: {
			// 计算属性的 getter
			isAddnew: function() {
				if (this.action == 'Addnew') {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			building_click: function() {
				this.$router.push('/building/portal');
			},

			onClickReturn: function() {
				this.$router.push('/building/portal');
			}
		},
		components: {
			[NavBar.name]: NavBar,
			// [Icon.name]: Icon,
			[Field.name]: Field,
			[Switch.name]: Switch,
			[Button.name]: Button,
			[Tabs.name]: Tabs,
			[Tab.name]: Tab,
			[Row.name]: Row,
			[Col.name]: Col,
			[Cell.name]: Cell,
			[Icon.name]: Icon
		}
	};
</script>

<style scoped lang="scss">
	@import '@/assets/style/my-vant';
	#unit {
		margin-top: 10px;
	}
	#layer {
		margin-top: 0px;
	}
</style>
