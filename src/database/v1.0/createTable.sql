
DROP TABLE estate_owner;



DROP TABLE room_plate;



DROP TABLE floor_plate;



DROP TABLE unit_plate;



DROP TABLE building_Plate;



DROP TABLE estate_plate;



DROP TABLE room;



DROP TABLE floor;



DROP TABLE unit;



DROP TABLE Building;



DROP TABLE estate;



DROP TABLE T_JCW;



DROP TABLE T_JLX;



DROP TABLE T_XZJD;



DROP TABLE T_XZQH;



CREATE TABLE Building
(
	building_id          VARCHAR(36) NOT NULL,
	used_flag            VARCHAR(1) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	floor_count          INTEGER NULL,
	unit_count           INTEGER NULL,
	building_alias       VARCHAR(50) NULL,
	room_count           INTEGER NULL,
	estate_id            VARCHAR(36) NULL,
	building_plate_id    VARCHAR(36) NULL,
	worker_id            VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	is_private           CHAR(1) NULL DEFAULT 1,
	x_84                 DOUBLE NULL,
	y_84                 DOUBLE NULL,
	x_54                 DOUBLE NULL,
	y_54                 DOUBLE NULL
);



ALTER TABLE Building
ADD PRIMARY KEY (building_id);



CREATE TABLE building_Plate
(
	building_plate_id    VARCHAR(36) NOT NULL,
	plate_suffix_id      VARCHAR(2) NULL,
	plate_number         VARCHAR(20) NULL,
	plate_prefix_id      VARCHAR(2) NULL,
	used_flag            VARCHAR(1) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	plate_desc           VARCHAR(100) NULL,
	estate_plate_id      VARCHAR(36) NULL,
	building_id          VARCHAR(36) NULL,
	plate_suffix_value   VARCHAR(10) NULL,
	plate_prefix_value   VARCHAR(10) NULL,
	plate_alias          VARCHAR(30) NULL,
	worker_id            VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp()
);



ALTER TABLE building_Plate
ADD PRIMARY KEY (building_plate_id);



CREATE TABLE estate
(
	estate_id            VARCHAR(36) NOT NULL,
	area_no              VARCHAR(20) NULL,
	owner                VARCHAR(20) NULL,
	name                 VARCHAR(20) NULL,
	purpose              VARCHAR(20) NULL,
	position             VARCHAR(20) NULL,
	space                VARCHAR(20) NULL,
	building_count       INTEGER NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	used_flag            VARCHAR(1) NULL DEFAULT '0',
	status               VARCHAR(2) NULL DEFAULT '0',
	estate_plate_id      VARCHAR(36) NULL,
	audit_status         VARCHAR(1) NULL DEFAULT '0',
	worker_id            VARCHAR(32) NULL,
  auditor_id           VARCHAR(32) NULL,
	type                 VARCHAR(20) NULL,
	is_private           CHAR(1) NULL DEFAULT 1,
  worker_dept_id       VARCHAR(20) NULL,
  worker_dept_name     VARCHAR(20) NULL,
  auditor_dept_id      VARCHAR(20) NULL,
  auditor_dept_name    VARCHAR(20) NULL,
	province             VARCHAR(20) NULL DEFAULT '湖北省',
	city                 VARCHAR(20) NULL,
	district             VARCHAR(18) NULL,
	province_id          VARCHAR(2) NULL DEFAULT '42',
	city_id              VARCHAR(4) NULL,
	district_id          VARCHAR(6) NULL
);



ALTER TABLE estate
ADD PRIMARY KEY (estate_id);



CREATE TABLE estate_owner
(
	worker_id            VARCHAR(32) NULL,
	id                   VARCHAR(32) NOT NULL,
	estate_id            VARCHAR(32) NULL,
	owner_woker_id       VARCHAR(32) NULL
);



ALTER TABLE estate_owner
ADD PRIMARY KEY (id);



CREATE TABLE estate_plate
(
	estate_plate_id      VARCHAR(36) NOT NULL,
	plate_suffix_id      VARCHAR(4) NULL,
	plate_number         VARCHAR(20) NULL,
	plate_prefix_id      VARCHAR(2) NULL,
	used_flag            VARCHAR(1) NULL DEFAULT '0',
	status               VARCHAR(2) NULL DEFAULT '0',
	street_id            VARCHAR(32) NULL,
	plate_desc           VARCHAR(100) NULL,
	plate_alias          VARCHAR(50) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	estate_id            VARCHAR(36) NULL,
	street_value         VARCHAR(50) NULL,
	plate_suffix_value   VARCHAR(20) NULL,
	plate_prefix_value   VARCHAR(20) NULL,
	worker_id            VARCHAR(20) NULL,
  province             VARCHAR(20) NULL DEFAULT '湖北省',
	city                 VARCHAR(20) NULL,
	district             VARCHAR(18) NULL,
	province_id          VARCHAR(2) NULL DEFAULT '42',
	city_id              VARCHAR(4) NULL,
	district_id          VARCHAR(6) NULL
);



ALTER TABLE estate_plate
ADD PRIMARY KEY (estate_plate_id);



CREATE TABLE floor
(
	floor_id             VARCHAR(36) NOT NULL,
	unit_id              VARCHAR(36) NULL,
	used_flag            VARCHAR(1) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	room_count           INTEGER NULL,
	floor_alias          VARCHAR(20) NULL,
	floor_plate_id       VARCHAR(36) NULL,
	building_id          VARCHAR(36) NULL,
	worker_id            VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	display_index        INTEGER NULL,
	is_private           VARCHAR(1) NULL DEFAULT 1
);



ALTER TABLE floor
ADD PRIMARY KEY (floor_id);



CREATE TABLE floor_plate
(
	floor_plate_id       VARCHAR(36) NOT NULL,
	plate_suffix_id      VARCHAR(2) NULL,
	plate_number         VARCHAR(4) NULL,
	floor_id             VARCHAR(36) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	used_flag            VARCHAR(1) NULL,
	unit_plate_id        VARCHAR(36) NULL,
	building_plate_id    VARCHAR(36) NULL,
	worker_id            VARCHAR(20) NULL,
	plate_desc           VARCHAR(20) NULL,
	plate_alias          VARCHAR(20) NULL,
	plate_suffix_value   VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp()
);



ALTER TABLE floor_plate
ADD PRIMARY KEY (floor_plate_id);



CREATE TABLE room
(
	room_id              VARCHAR(36) NOT NULL,
	floor_id             VARCHAR(36) NULL,
	used_flag            VARCHAR(1) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	room_alias           VARCHAR(100) NULL,
	room_plate_id        VARCHAR(36) NULL,
	building_id          VARCHAR(36) NULL,
	worker_id            VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	display_index        INTEGER NULL,
	is_private           CHAR(1) NULL DEFAULT 1,
  worker_dept_id       VARCHAR(20) NULL,
  worker_dept_name     VARCHAR(20) NULL,
  auditor_dept_id      VARCHAR(20) NULL,
  auditor_dept_name    VARCHAR(20) NULL
);



ALTER TABLE room
ADD PRIMARY KEY (room_id);



CREATE TABLE room_plate
(
	plate_suffix_id      VARCHAR(2) NULL,
	plate_number         VARCHAR(20) NULL,
	room_id              VARCHAR(36) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	used_flag            VARCHAR(1) NULL,
	floor_plate_id       VARCHAR(36) NOT NULL,
	room_plate_id        VARCHAR(36) NOT NULL,
	building_plate_id    VARCHAR(36) NULL,
	worker_id            VARCHAR(20) NULL,
	plate_suffix_value   VARCHAR(20) NULL,
	plate_desc           VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	building_plate_show  INTEGER NULL DEFAULT 0,
	unit_plate_show      INTEGER NULL DEFAULT 0,
	floor_plate_show     INTEGER NULL DEFAULT 0,
	room_plate_show      INTEGER NULL DEFAULT 0
);



ALTER TABLE room_plate
ADD PRIMARY KEY (room_plate_id);



CREATE TABLE T_JCW
(
	JCW_BM               VARCHAR(38) NOT NULL,
	JCW_MC               VARCHAR(100) NULL,
	XZJD_BM              VARCHAR(18) NULL
);



ALTER TABLE T_JCW
ADD PRIMARY KEY (JCW_BM);



CREATE TABLE T_JLX
(
	JLX_BM               VARCHAR(38) NOT NULL,
	XZQH_BM              VARCHAR(32) NULL,
	JLX_MC               VARCHAR(100) NULL
);



ALTER TABLE T_JLX
ADD PRIMARY KEY (JLX_BM);



CREATE TABLE T_XZJD
(
	XZJD_BM              VARCHAR(18) NOT NULL,
	XZQH_BM              VARCHAR(32) NULL,
	JDMC                 VARCHAR(20) NULL
);



ALTER TABLE T_XZJD
ADD PRIMARY KEY (XZJD_BM);



CREATE TABLE T_XZQH
(
	XZQH_MC              VARCHAR(18) NULL,
	XZQH_BM              VARCHAR(32) NOT NULL,
	CJSJ                 CHAR(18) NULL,
	XZQH_SJDW            CHAR(18) NULL
);



ALTER TABLE T_XZQH
ADD PRIMARY KEY (XZQH_BM);



CREATE TABLE unit
(
	unit_id              VARCHAR(36) NOT NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	building_id          VARCHAR(36) NULL,
	floor_count          INTEGER NULL,
	room_count           INTEGER NULL,
	unit_plate_id        VARCHAR(36) NULL,
	unit_alias           VARCHAR(20) NULL,
	used_flag            VARCHAR(1) NULL,
	worker_id            VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp(),
	display_index        INTEGER NULL,
	is_private           CHAR(1) NULL DEFAULT 1
);



ALTER TABLE unit
ADD PRIMARY KEY (unit_id);



CREATE TABLE unit_plate
(
	plate_suffix_id      VARCHAR(2) NULL,
	plate_number         VARCHAR(20) NULL,
	unit_id              VARCHAR(36) NULL,
	status               VARCHAR(2) NULL DEFAULT '0',
	used_flag            VARCHAR(1) NULL,
	unit_plate_id        VARCHAR(36) NOT NULL,
	building_plate_id    VARCHAR(36) NULL,
	worker_id            VARCHAR(20) NULL,
	plate_desc           VARCHAR(20) NULL,
	plate_suffix_value   VARCHAR(20) NULL,
	plate_alias          VARCHAR(20) NULL,
	create_date          DATETIME NULL DEFAULT current_timestamp()
);



ALTER TABLE unit_plate
ADD PRIMARY KEY (unit_plate_id);



ALTER TABLE Building
ADD FOREIGN KEY R_10 (estate_id) REFERENCES estate (estate_id);



ALTER TABLE building_Plate
ADD FOREIGN KEY R_11 (estate_plate_id) REFERENCES estate_plate (estate_plate_id);



ALTER TABLE building_Plate
ADD FOREIGN KEY R_12 (building_id) REFERENCES Building (building_id);



ALTER TABLE estate_plate
ADD FOREIGN KEY R_9 (estate_id) REFERENCES estate (estate_id);



ALTER TABLE floor
ADD FOREIGN KEY R_16 (unit_id) REFERENCES unit (unit_id);



ALTER TABLE floor_plate
ADD FOREIGN KEY R_17 (unit_plate_id) REFERENCES unit_plate (unit_plate_id);



ALTER TABLE floor_plate
ADD FOREIGN KEY R_18 (floor_id) REFERENCES floor (floor_id);



ALTER TABLE room
ADD FOREIGN KEY R_19 (floor_id) REFERENCES floor (floor_id);



ALTER TABLE room_plate
ADD FOREIGN KEY R_20 (room_id) REFERENCES room (room_id);



ALTER TABLE room_plate
ADD FOREIGN KEY R_21 (floor_plate_id) REFERENCES floor_plate (floor_plate_id);



ALTER TABLE unit
ADD FOREIGN KEY R_13 (building_id) REFERENCES Building (building_id);



ALTER TABLE unit_plate
ADD FOREIGN KEY R_14 (unit_id) REFERENCES unit (unit_id);



ALTER TABLE unit_plate
ADD FOREIGN KEY R_15 (building_plate_id) REFERENCES building_Plate (building_plate_id);
