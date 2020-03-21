/* eslint-disable no-undef */
import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line

const login = r => require.ensure([], () => r(require('../views/login')), 'login');

const estate = r => require.ensure([], () => r(require('../views/estate/estates')), 'estates');

// eslint-disable-next-line camelcase
const estate_portal = r =>
  require.ensure(
    [],
    () => r(require('../views/estate/estatePortal/estatePortal')),
    'estate_portal'
  );
// eslint-disable-next-line camelcase
const estate_edit = r =>
  require.ensure([], () => r(require('../views/estate/estateEdit/estateEdit')), 'estate_edit');
const building_portal = r =>
  require.ensure(
    [],
    () => r(require('../views/estate/buildingPortal/buildingPortal')),
    'building_portal'
  );
const building_edit = r =>
  require.ensure(
    [],
    () => r(require('../views/estate/buildingEdit/buildingEdit')),
    'building_struct'
  );

const unit_edit = r =>
  require.ensure([], () => r(require('../views/estate/unitEdit/unitEdit')), 'unit_edit');
const room_edit = r =>
  require.ensure([], () => r(require('../views/estate/roomEdit/roomEdit')), 'room_edit');

const floor_edit = r =>
  // eslint-disable-next-line no-undef
  require.ensure([], () => r(require('../views/estate/floorEdit/floorEdit')), 'floor_edit');

const mine_portal = r =>
  // eslint-disable-next-line no-undef
  require.ensure([], () => r(require('../views/mine/portal/portal')), 'mine_portal');
const mine_mystreet = r =>
  //eslint-disable-next-line no-undef
  require.ensure([], () => r(require('../views/mine/street/myStreet')), 'mine_mystreet');
const mine_auditor = r =>
  //eslint-disable-next-line no-undef
  require.ensure([], () => r(require('../views/mine/auditor/auditor')), 'mine_auditor');
const audit_portal = r =>
  //eslint-disable-next-line no-undef
  require.ensure([], () => r(require('../views/audit/portal/portal')), 'audit_portal');
const draw_rooms = r =>
  //eslint-disable-next-line no-undef
  require.ensure([], () => r(require('../views/estate/drawRooms/drawRooms')), 'draw_rooms');

//懒加载写法
// const login = () => import('../views/login');
// const estate = () => import('../views/estate/estates');
// const estate_portal = () => import('../views/estate/estatePortal/estatePortal');
// const estate_edit = () => import('../views/estate/estateEdit/estateEdit');
// const building_portal = () => import('../views/estate/buildingPortal/buildingPortal');
// const building_edit = () => import('../views/estate/buildingEdit/buildingEdit');
// const unit_edit = () => import('../views/estate/unitEdit/unitEdit');
// const room_edit = () => import('../views/estate/roomEdit/roomEdit');
// const floor_edit = () => import('../views/estate/floorEdit/floorEdit');
// const mine_portal = () => import('../views/mine/portal/portal');
// const mine_mystreet = () => import('../views/mine/street/myStreet');
// const mine_auditor = () => import('../views/mine/auditor/auditor');
// const audit_portal = () => import('../views/audit/portal/portal');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/estate',
    name: 'estate',
    component: estate
  },
  {
    path: '/estate/portal',
    name: 'estate_portal',
    component: estate_portal
  },
  {
    path: '/estate/edit',
    name: 'estate_edit',
    component: estate_edit
  },
  {
    path: '/building/portal',
    name: 'building_portal',
    component: building_portal
  },
  {
    path: '/building/edit',
    name: 'building_edit',
    component: building_edit
  },
  {
    path: '/room/edit',
    name: 'room_edit',
    component: room_edit
  },
  {
    path: '/unit/edit',
    name: 'unit_edit',
    component: unit_edit
  },
  {
    path: '/floor/edit',
    name: 'floor_edit',
    component: floor_edit
  },
  {
    path: '/mine/portal',
    name: 'mine_portal',
    component: mine_portal
  },
  {
    path: '/mine/mystreet',
    name: 'mine_mystreet',
    component: mine_mystreet
  },
  {
    path: '/mine/auditor',
    name: 'mine_auditor',
    component: mine_auditor
  },
  {
    path: '/estate/drawRooms',
    name: 'draw_rooms',
    component: draw_rooms
  },
  {
    path: '/audit/portal',
    name: 'audit_portal',
    component: audit_portal
  }
];

const router = new VueRouter({
  routes
});

export default router;
