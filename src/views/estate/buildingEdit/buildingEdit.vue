<template>
	<div id="building-edit " class="estate-page">
		<div class="estate-title">
			<div class="my-van">
				<van-nav-bar title="建筑楼栋登记 " left-text="返回" @click-left="onClickReturn" />
			</div>
		</div>

		<div class="estate-main">
			<van-cell-group title="楼栋门牌">
				<!-- <van-row style="margin-top:10px;"> -->
				<van-field
					label="大门牌:"
					:value="this.estatePlateDesc"
					readonly
					required
					input-align="right"
					placeholder="请选择大门牌"
				/>
				<van-cell title="临时建筑:">
					<van-switch size="20" v-model="objBuilding.isPrivate" slot="right-icon" />
				</van-cell>
				<plate-prefix-control></plate-prefix-control>

				<van-field
					label="楼栋号:"
					v-model="plate.plateNumber"
					required
					input-align="right"
					placeholder="请输入楼栋门牌"
				/>
				<plate-suffix-control></plate-suffix-control>
				<van-cell title="门牌中是否显示：">
					<van-switch size="20" v-model="objBuilding.isPrivate" slot="right-icon" />
				</van-cell>
				<!-- </van-row> -->
			</van-cell-group>
			<van-cell-group v-if="isAddnew(this)" title="基础信息">
				<!-- <van-row style="margin-top:10px;"> -->
				<van-field
					label="楼栋名称:"
					v-show="false"
					v-model="objBuilding.buildingAlias"
					input-align="right"
					placeholder="请输入楼栋的名称"
				/>
				<van-cell title="楼栋单元数">
					<van-stepper v-model="objBuilding.unitCount" min="1" max="20" />
				</van-cell>
				<van-cell title="每单元楼层数">
					<van-stepper v-model="objBuilding.floorCount" min="0" max="20" />
				</van-cell>
				<van-cell title="每层户数">
					<van-stepper v-model="objBuilding.roomCount" min="0" max="20" />
				</van-cell>

				<!-- </van-row> -->
			</van-cell-group>

			<van-row v-show="this.$store.state.user.role == 'worker'" style="margin-top:10px;">
				<van-button
					v-if="isAddnew(this)"
					style=" height:30px;line-height:30px;"
					@click="onDrawRoomClick()"
					type="info"
					color="#409eff"
					block
					>构建楼栋结构图</van-button
				>
			</van-row>

			<div v-if="!isAddnew(this)" v-show="this.$store.state.user.role == 'worker'">
				<!-- <van-row v-show="this.$store.state.user.role == 'worker'" style="width:100%;margin-bottom:2px;margin-right:10px; "> -->
				<van-button
					style=" height:40px;width:100%;margin-right:10px"
					@click="onSaveClick()"
					plain
					type="info"
				>
					保存</van-button
				>

				<van-button
					plain
					type="info"
					color="#ff976a"
					style=" height:40px;width:100%;margin-right:10px"
					block
					@click="onDeleteClick()"
				>
					删除</van-button
				>
				<!-- </van-row> -->
			</div>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
	//import estateSummary from '@/components/estate/estate-summary.vue';
	import {
		NavBar,
		Icon,
		Field,
		Button,
		Row,
		Col,
		Tabs,
		Tab,
		Cell,
		CellGroup,
		Switch,
		Stepper
	} from 'vant';

	import 'vant/lib/nav-bar/style';
	import 'vant/lib/tabs/style';
	import 'vant/lib/tab/style';
	import 'vant/lib/field/style';
	import 'vant/lib/button/style';
	import 'vant/lib/cell/style';
	import 'vant/lib/stepper/style';
	import 'vant/lib/cell-group/style';
	import 'vant/lib/row/style';
	import 'vant/lib/col/style';
	import 'vant/lib/switch/style';
	import { buildingObject } from '@/api/type/building.type.js';
	// import { createBuildingStruct } from './buildingEdit.addon.js';
	import platePrefixControl from '@/components/estate/buildingEdit/platePrefixControl.vue';
	import plateSuffixControl from '@/components/estate/buildingEdit/plateSuffixControl.vue';

	export default {
		name: 'estate-edit',
		data() {
			return {
				loading: true,

				objBuilding: {}
			};
		},
		methods: {
			isAddnew: that => {
				if (that.action(that) == 'addnew' || that.action(that) == 'addnew-refresh') {
					return true;
				}
			},
			action: that => {
				if (that.$route.params.action == 'addnew') {
					return `addnew`;
				}
				if (that.$route.params.action == 'edit') {
					return `edit`;
				}

				if (that.$route.params.action == undefined) {
					if (that.objBuilding.buildingId == '') {
						return 'addnew-refresh';
					} else {
						return 'edit-refresh';
					}
				}
			},
			onClickReturn: function() {
				this.$router.push('/estate/portal');
			},
			computePlateDesc: function() {
				var a = this.objBuilding.buildingPlate.plateDesc;
				if (a !== undefined) {
					if (this.objBuilding.buildingPlate.platePrefixValue !== undefined) {
						a = this.objBuilding.buildingPlate.platePrefixValue;
					}

					a = a + this.objBuilding.buildingPlate.plateNumber + '';
					a = a + this.objBuilding.buildingPlate.plateSuffixValue + '';
					return a;
				} else {
					return this.objBuilding.buildingPlate.plateDesc;
				}
			},

			onDrawRoomClick: function() {
				this.plate.platePrefixId = this.$store.state.building.platePrefixId;
				this.plate.platePrefixValue = this.$store.state.building.platePrefixValue;
				this.plate.plateSuffixId = this.$store.state.building.plateSuffixId;
				this.plate.plateSuffixValue = this.$store.state.building.plateSuffixValue;
				this.plate.plateDesc = this.computePlateDesc();
				this.plate.plateAlias = this.plate.plateDesc;
				this.objBuilding.buildingAlias = this.plate.plateDesc;

				// createBuildingStruct(this.objBuilding);

				sessionStorage.setItem('building', JSON.stringify(this.objBuilding));
				this.$router.push('/estate/drawRooms');
			}
		},
		computed: {
			estatePlateDesc: function() {
				return this.$store.state.estate.estatePlateDesc;
			},
			estate: function() {
				return this.$store.state.estate;
			},
			plate: function() {
				return this.objBuilding.buildingPlate;
			}
		},
		created: function() {
			this.objBuilding = JSON.parse(sessionStorage.getItem('building'));
			var action = this.action(this);
			if (action == 'addnew') {
				//初始化一个空building对象
				this.$store.commit('building/cleanBuilding');
				this.objBuilding = new buildingObject();
				this.objBuilding.estateId = this.estate.estateId;
				this.plate.estatePlateId = this.estate.estatePlateId;
				this.objBuilding.workerId = this.$store.state.user.userId;
				this.plate.workerId = this.$store.state.user.userId;
				sessionStorage.setItem('building', JSON.stringify(this.objBuilding));
			}
			if (action == 'edit') {
				//从数据库读取数据
			}
		},

		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Field.name]: Field,
			[Button.name]: Button,
			[Tabs.name]: Tabs,
			[Tab.name]: Tab,
			[Row.name]: Row,
			[Col.name]: Col,
			[Cell.name]: Cell,
			[Switch.name]: Switch,
			[Stepper.name]: Stepper,
			[CellGroup.name]: CellGroup,
			platePrefixControl,
			plateSuffixControl
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

<style lang="scss">
	@import '@/assets/style/my-vant';
</style>
