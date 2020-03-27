 
<template>
	<div id="room-plate-panel" style="height:400px">
		<div id="loading" v-if="loading" style="z-index:999">
			<van-loading size="60" type="spinner" />
		</div>
		<div v-if="!loading" style="z-index:10">
			<van-row style="margin-top:10px;">
				<van-field label="行政区划:" input-align="right" />
				<van-field label="门牌全称:" :value="this.plateDesc()" input-align="right" />

				<van-field label="楼栋显示:" readonly input-align="right">
					<van-switch
						size="20"
						slot="right-icon"
						v-model="buildingPlateShow"
						style="margin-right:10px"
					/>
				</van-field>
				<van-field label="单元显示:" input-align="right">
					<van-switch
						size="20"
						slot="right-icon"
						v-model="unitPlateShow"
						style="margin-right:10px"
					/>
				</van-field>
				<van-field label="楼层显示:" input-align="right">
					<van-switch
						size="20"
						slot="right-icon"
						v-model="floorPlateShow"
						style="margin-right:10px"
					/>
				</van-field>
				<van-field label="房间显示:" input-align="right">
					<van-switch
						size="20"
						slot="right-icon"
						v-model="roomPlateShow"
						style="margin-right:10px"
					/>
				</van-field>
				<van-field label="保存设置:" input-align="right">
					<van-button
						style=" height:25px;line-height:25px;"
						type="info"
						round
						slot="right-icon"
						@click="onSaveClick()"
						block
					>
						保存</van-button
					>
					/>
				</van-field>
			</van-row>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	// import Estate from '@/views/Estate.vue'
	import { Icon, Row, Col, Field, Popup, Picker, Switch, Button } from 'vant';
	import 'vant/lib/nav-bar/style';
	import 'vant/lib/row/style';
	import 'vant/lib/col/style';
	import 'vant/lib/field/style';
	import 'vant/lib/popup/style';
	import 'vant/lib/picker/style';
	import 'vant/lib/switch/style';
	import 'vant/lib/button/style';
	import { $toast } from '@/assets/common/common.js';
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				loading: 'true',
				estatePlate: '',
				buildingPlate: '',
				unitPlate: '',
				floorPlate: '',
				roomPlate: '',
				roomPlateId: '',
				estatePlateShow: 0,
				buildingPlateShow: 0,
				unitPlateShow: 0,
				floorPlateShow: 0,
				roomPlateShow: 0
			};
		},
		created: async function() {
			var roomId = this.roomId;

			if (roomId !== undefined) {
				try {
					const params = Object.assign({}, params, {
						params: { roomId }
					});
					roomId = params;
					var res = await this.$api.room.getRoomPlateElments(roomId);
					if (res.data.statusCode == '-1') {
						$toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
						this.loading = false;
						return;
					}
					this.roomPlateId = res.data.result.room_plate_id;
					this.estatePlate = res.data.result.estate_plate_desc;
					this.buildingPlate = res.data.result.building_plate_desc;
					this.unitPlate = res.data.result.unit_plate_desc;
					this.floorPlate = res.data.result.floor_plate_desc;
					this.roomPlate = res.data.result.room_plate_desc;

					this.estatePlateShow = this.indexToBool(res.data.result.estate_plate_show);
					this.buildingPlateShow = this.indexToBool(res.data.result.building_plate_show);
					this.unitPlateShow = this.indexToBool(res.data.result.unit_plate_show);
					this.floorPlateShow = this.indexToBool(res.data.result.floor_plate_show);
					this.roomPlateShow = this.indexToBool(res.data.result.room_plate_show);

					this.loading = false;
				} catch (error) {
					$toast.alert('获取数据失败！\n' + JSON.stringify(error), 5000);
					this.loading = false;
					return error;
				}
			}
		},
		methods: {
			plateDesc: function() {
				var plate = this.estatePlate;
				if (this.buildingPlateShow) {
					plate = plate + '/' + this.buildingPlate;
				}
				if (this.unitPlateShow) {
					plate = plate + '/' + this.unitPlate;
				}
				if (this.floorPlateShow) {
					plate = plate + '/' + this.floorPlate;
				}
				if (this.roomPlateShow) {
					plate = plate + '/' + this.roomPlate;
				}
				return plate;
			},
			indexToBool: function(value) {
				if (value == 0) {
					return true;
				} else {
					return false;
				}
			},
			boolToIndex: function(value) {
				if (value) {
					return 0;
				} else {
					return 1;
				}
			},
			onSaveClick: async function() {
				var postData = {};
				postData.room_id = this.roomId;
				postData.room_plate = {};
				postData.room_plate.room_plate_id = this.roomPlateId;
				postData.room_plate.building_plate_show = this.boolToIndex(this.buildingPlateShow);
				postData.room_plate.unit_plate_show = this.boolToIndex(this.unitPlateShow);
				postData.room_plate.floor_plate_show = this.boolToIndex(this.floorPlateShow);
				postData.room_plate.room_plate_show = this.boolToIndex(this.roomPlateShow);

				try {
					const params = Object.assign({}, params, {
						room: postData
					});
					$toast.loading('正在保存...', 0);
					var res = await this.$api.room.updateRoom(params);
					if (res.data.statusCode == '-1') {
						$toast.alert('获取数据失败！\n' + JSON.stringify(res.data.result), 5000);
						$toast.close();
						return;
					}
					$toast.success('保存成功！', 1500);
				} catch (error) {
					$toast.alert('保存数据失败！\n' + JSON.stringify(error), 5000);
					$toast.close();
					return error;
				}
			}
		},
		props: ['roomId'],
		computed: {
			...mapGetters([
				'estate/getters_plateDesc',
				'estate/getters_estateId',
				'estate/getters_estatePlateId'
			])
		},

		components: {
			// [NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Switch.name]: Switch,
			[Row.name]: Row,
			[Col.name]: Col,
			[Field.name]: Field,
			[Popup.name]: Popup,
			[Button.name]: Button,
			[Picker.name]: Picker
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/style/my-vant';
</style>
