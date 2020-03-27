<template>
	<div id="room-edit " class="estate-page">
		<div class="estate-title">
			<div class="my-van">
				<van-nav-bar :title="this.pageTitle" left-text="返回" @click-left="onClickReturn" />
			</div>
		</div>

		<div class="estate-main">
			<div id="edit">
				<van-cell-group title=" 房间信息:">
					<van-field
						v-show="!this.isAddnew"
						label="原门牌"
						:value="this.old_plate_desc"
						input-align="right"
					/>
					<van-field
						v-show="!this.isAddnew"
						label="修改后门牌"
						:value="this.afterChangePlateDesc"
						input-align="right"
					/>
					<van-field
						v-show="this.isAddnew"
						label="所在楼层"
						:value="this.oldData.objFloor.floor_alias"
						input-align="left"
						placeholder="请输入房间门牌号"
					/>
					<van-cell title="临时建筑:（否/是）">
						<van-switch
							size="20"
							v-model="roomPlateIsPrivate"
							slot="right-icon"
							@change="editPlatePrivateStatus"
						/>
					</van-cell>
					<!-- 修改楼层 -->
					<van-row v-show="!this.isAddnew">
						<van-col span="24">
							<floor-picker
								:objUnit="this.oldData.objUnit"
								@floor-picker-confirm="floorPickerConfirm"
							></floor-picker>
						</van-col>
					</van-row>
					<!-- 修改门牌 -->
					<van-row>
						<van-field
							v-model="new_plate_number"
							:label="this.roomPlateTitle"
							input-align="left"
							placeholder="请输入房间门牌号"
						>
							<van-icon
								class-prefix="my-icon"
								v-show="!this.isAddnew"
								name="success"
								@click="editPlateNumber"
								size="28"
								color="#409eff"
								slot="right-icon"
							/>
						</van-field>
					</van-row>
					<van-row>
						<van-col span="24">
							<van-field :label="roomAliasTitle" input-align="left" placeholder="请输入房间门牌号">
								<van-icon
									v-show="!this.isAddnew"
									class-prefix="my-icon"
									name="success"
									size="28"
									color="#409eff"
									slot="right-icon"
								/> </van-field
						></van-col>
						<!-- <van-col span="4">
              <van-button v-show="!this.isAddnew" size="small" hairline type="info"
                >保存</van-button
              ></van-col
            > -->
					</van-row>
				</van-cell-group>

				<van-cell-group v-if="false" title="新房间信息:">
					<floor-picker
						v-show="!this.isAddnew"
						:objUnit="this.oldData.objUnit"
						@floor-picker-confirm="floorPickerConfirm"
					></floor-picker>

					<van-field
						label="门牌号"
						required
						input-align="right"
						v-model="postData.room_plate.plate_number"
						placeholder="请输入新的房间门牌号"
						right-icon=""
					/>
					<van-field label="修改房间别名" input-align="right" placeholder="原来的房间门牌号">
						<van-icon
							class-prefix="my-icon"
							name="success"
							size="28"
							color="#409eff"
							slot="right-icon"
						/>
					</van-field>
				</van-cell-group>

				<van-row style="margin-top:10px; ">
					<van-button
						v-show="this.isAddnew"
						style=" height:30px;line-height:30px;"
						type="info"
						color="#409eff"
						@click="onSaveClick()"
						block
					>
						保存</van-button
					>

					<van-button
						type="danger"
						v-show="!this.isAddnew"
						style=" height:30px;margin-top:4px;line-height:30px;"
						block
					>
						删除</van-button
					>
				</van-row>
			</div>
		</div>

		<router-view></router-view>
	</div>
</template>

<script>
	//import estateSummary from '@/components/estate/estate-summary.vue';
	import { NavBar, Icon, Field, Button, Cell, CellGroup, Switch, Row, Col } from 'vant';
	import 'vant/lib/nav-bar/style';
	import 'vant/lib/field/style';
	import 'vant/lib/button/style';
	import 'vant/lib/switch/style';
	import 'vant/lib/cell/style';
	import 'vant/lib/cell-group/style';
	import 'vant/lib/row/style';
	import 'vant/lib/col/style';

	import floorPicker from '@/components/estate/buildingEdit/floorPicker.vue';
	import { roomObject } from '@/api/type/building.type.js';
	import dbAction from './db.action';

	export default {
		name: 'roomEdit',
		data() {
			return {
				oldData: {
					objUnit: {},
					objFloor: {},
					objBuilding: {},
					objRoom: {}
				},
				afterChangePlateDesc: '',
				old_plate_desc: '',
				new_plate_number: '',
				postData: {}
			};
		},
		created() {
			if (this.$route.params.action == undefined) {
				this.$router.push({
					name: 'building_portal'
				});
				return;
			}

			//初始化对象赋值对象, 根据对象索引，从缓存中指定修改前的对象
			this.oldData.objBuilding = JSON.parse(sessionStorage.getItem('building'));
			this.oldData.objUnit = this.oldData.objBuilding.units[this.$route.params.unitIdx];
			this.oldData.unitIdx = this.$route.params.unitIdx;

			this.oldData.objFloor = this.oldData.objUnit.floors[this.$route.params.floorIdx];

			this.oldData.floorIdx = this.$route.params.floorIdx;
			this.postData = new roomObject();
			this.postData.worker_id = this.$store.state.user.userId;
			this.postData.floor_id = this.oldData.objFloor.floor_id;
			this.postData.room_plate.floor_plate_id = this.oldData.objFloor.floor_plate_id;
			this.postData.is_private = '1';

			if (!this.isAddnew) {
				this.oldData.objRoom = this.oldData.objFloor.rooms[this.$route.params.roomIdx];
				this.oldData.roomIdx = this.$route.params.roomIdx;

				this.postData.is_private = this.oldData.objRoom.is_private;

				this.old_plate_desc =
					this.oldData.objUnit.unit_alias +
					'/' +
					this.oldData.objFloor.floor_alias +
					'/' +
					this.oldData.objRoom.room_alias;

				this.afterChangePlateDesc = this.old_plate_desc;
			}
		},
		methods: {
			onClickReturn: function() {
				this.$router.push('/building/portal');
			},

			floorPickerConfirm(value, index) {
				//value是floorPick组件选中的两个对象的index
				this.postData.floor_id = value.floor_id;
				this.postData.room_plate.floor_plate_id = value.floor_plate_id;
				// this.postData.display_index中记录的是room变更到的新楼层的索引值
				//display_index在变更过程中没有用到，这里用来临时存放新楼层索引值

				this.postData.display_index = index;
				this.editRoomFloor();
			},
			editRoomFloor() {
				if (dbAction.updateFloor(this.oldData, this.postData)) {
					this.afterChangePlateDesc =
						this.oldData.objUnit.unit_alias +
						'/' +
						this.oldData.objUnit.floors[this.postData.display_index].floor_alias +
						'/' +
						this.oldData.objRoom.room_alias;
				}
			},
			editPlatePrivateStatus() {
				if (!this.isAddnew) {
					dbAction.updatePlatePrivateStatus(this.oldData, this.postData).then(res => {
						res = 'true';
						sessionStorage.setItem('building', JSON.stringify(this.oldData.objBuilding));
						window.console.log(res);
					});
				}
			},

			editPlateNumber() {
				this.postData.plate_number = this.new_plate_number;

				dbAction.updatePlateNumber(this.oldData, this.postData).then(res => {
					this.afterChangePlateDesc =
						this.oldData.objUnit.unit_alias +
						'/' +
						this.oldData.objFloor.floor_alias +
						'/' +
						this.oldData.objRoom.room_alias;
					sessionStorage.setItem('building', JSON.stringify(this.oldData.objBuilding));
					window.console.log(res);
				});
			},

			onSaveClick: async function() {
				this.postData.room_plate.plate_number = this.new_plate_number;
				dbAction.addNew(this.oldData, this.postData);
			}
		},
		computed: {
			isAddnew: function() {
				if (this.$route.params.action == 'addnew') {
					return true;
				} else {
					return false;
				}
			},
			roomPlateIsPrivate: {
				set: function(value) {
					if (value) {
						this.postData.is_private = 0;
					} else {
						this.postData.is_private = 1;
					}
				},
				get: function() {
					if (this.postData.is_private == 0) {
						return true;
					} else {
						return false;
					}
				}
			},
			roomPlateTitle: function() {
				return this.isAddnew ? '门牌号' : '修改门牌号';
			},
			roomAliasTitle: function() {
				return this.isAddnew ? '门牌别名' : '修改门牌别名';
			},
			pageTitle: function() {
				return this.isAddnew ? '新增一个房间' : '修改房间信息';
			}
		},

		components: {
			[NavBar.name]: NavBar,
			[Switch.name]: Switch,
			[Icon.name]: Icon,
			[Field.name]: Field,
			[Button.name]: Button,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup,
			[Row.name]: Row,
			[Col.name]: Col,
			floorPicker
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
