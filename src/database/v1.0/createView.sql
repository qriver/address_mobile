drop view v_room_plate;

create view v_room_plate as
select   a.room_id,
         a.room_plate_id,     a.plate_desc   room_plate_desc,       
         b.floor_plate_id,    b.plate_desc   floor_plate_desc,    
         c.unit_plate_id,     c.plate_desc   unit_plate_desc,       
         d.building_plate_id, d.plate_desc   building_plate_desc,   
         e.estate_plate_id ,  e.plate_desc   estate_plate_desc,
         a.building_plate_show,a.unit_plate_show,a.floor_plate_show,a.room_plate_show 
  from   room_plate a,floor_plate  b,unit_plate  c,building_plate  d,estate_plate  e
  where  a.floor_plate_id=b.floor_plate_id and
         b.unit_plate_id=c.unit_plate_id and
         c.building_plate_id=d.building_plate_id and
         d.estate_plate_id=e.estate_plate_id;