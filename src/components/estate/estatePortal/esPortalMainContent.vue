<template>
	<div id="es-input-main-content" class="my-content">
		<!-- 项目情况介绍 -->
		<div class="my-skeleton ">
			<div class="my-avatar">
				<van-icon size="30" color="#409eff" class-prefix="my-icon" name="company" />
			</div>
			<div class="my-skeleton-content">
				<div id="title" class="title">
					<div>
						<span>{{ this.estateInstance.name }}</span>
					</div>
					<div class="icon">
						<van-icon
							size="30"
							color="#409eff"
							class-prefix="my-icon"
							name="arrow-right"
							@click="onClickEstateModify"
						/>
						<!-- <i class="van-icon van-icon-arrow" @click="onClickEstateModify" /> -->
					</div>
				</div>
				<div id="note" class="note">
					<span>用地单位：{{ this.estateInstance.owner }}</span>
					<van-col span="14"
						><span>审核状态：</span>
						<van-tag plain size="small" :color="getAuditColor()">{{ getAuditText() }}</van-tag>
					</van-col>
				</div>
			</div>
		</div>
		<div class="my-note">
			<!-- 说明:该项目2012-2-12立项,规划建筑面积241233平方,建筑功能为:住宅商业及配套,用地位置沿江大道 ,规划栋数1栋,建筑单位XXXXX公司 -->
			<van-row gutter="20" type="flex">
				<van-col span="12">立项时间：{{ this.estateInstance.createDate }} </van-col>
				<van-col span="12"> 规划面积：{{ this.estateInstance.space }} </van-col>
			</van-row>
			<van-row gutter="20" type="flex">
				<van-col span="12">建筑功能：{{ this.estateInstance.purpose }} </van-col>
				<van-col span="12"> 用地位置：{{ this.estateInstance.position }} </van-col>
			</van-row>
			<van-row gutter="20" type="flex">
				<van-col span="12">规划栋数：{{ this.estateInstance.buildingCount }} </van-col>
				<van-col span="12"> 建筑性质：{{ this.estateInstance.type }} </van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	// import Estate from '@/views/Estate.vue'
	import { NavBar, Icon, Row, Col, Tag } from 'vant';
	import 'vant/lib/nav-bar/style';
	import 'vant/lib/row/style';
	import 'vant/lib/col/style';
	import 'vant/lib/tag/style';

	export default {
		name: 'es-input-main-content',
		components: {
			[NavBar.name]: NavBar,
			[Icon.name]: Icon,
			[Tag.name]: Tag,
			[Row.name]: Row,
			[Col.name]: Col
		},
		data() {
			return {
				audit: {
					text: '',
					color: ''
				},
				auditStatus: {
					readying: { id: 0, color: '#8896B3', text: '未提交' },
					waiting: { id: 1, color: '#E6a23c', text: '待审核' },
					back: { id: 2, color: '#F56C6C ', text: '已退回' },
					ok: { id: 3, color: '#5cbb7a  ', text: '已审核' }
				}
			};
		},

		props: ['estateInstance'],
		methods: {
			onClickEstateModify: function() {
				this.$router.push({
					name: 'estate_edit',
					params: {
						action: 'edit',
						estate_id: this.estateInstance.estate_id
					}
				});
			},
			getAuditText: function() {
				// window.console.log(code);
				var text = '';
				var code = this.estateInstance.auditStatus;
				if (code == this.auditStatus.readying.id) {
					text = this.auditStatus.readying.text;
				}
				if (code == this.auditStatus.waiting.id) {
					text = this.auditStatus.waiting.text;
				}
				if (code == this.auditStatus.back.id) {
					text = this.auditStatus.back.text;
				}
				if (code == this.auditStatus.ok.id) {
					text = this.auditStatus.ok.text;
				}
				return text;
			},
			getAuditColor: function() {
				var color = '';
				var code = this.estateInstance.auditStatus;
				if (code == this.auditStatus.readying.id) {
					color = this.auditStatus.readying.color;
				}
				if (code == this.auditStatus.waiting.id) {
					color = this.auditStatus.waiting.color;
				}
				if (code == this.auditStatus.back.id) {
					color = this.auditStatus.back.color;
				}
				if (code == this.auditStatus.ok.id) {
					color = this.auditStatus.ok.color;
				}
				return color;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '@/assets/style/my-vant';
	.my-skeleton-content {
		.note {
			display: flex;
			flex-direction: column;
		}
	}

	.my-content {
		width: 100%;
		background-color: white;
		height: 128px;
		margin-bottom: 10px;
		padding-bottom: 10px;
	}

	.my-note {
		font-size: $font-size-sm;
		color: $gray-7;
		margin-top: 4px;
		margin-left: 10px;
		margin-right: 10px;
		.van-col {
			//  width: 20px;
			// height: 100px;
			//  border: 1px solid red;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-left: 10px;
		}
	}
</style>
