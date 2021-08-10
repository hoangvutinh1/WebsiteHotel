DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255),
  `name` varchar(255),
  `username` varchar(255),
  `isAdmin` boolean,
  PRIMARY KEY (`userId`)
);
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms`(
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `name` varchar(255) not null,
  `slug` varchar(255) not null,
  `type` varchar(255),
  `price` int,
  `capacity` int,
  `description` varchar(255),
  `extras` varchar(255),
  `images` varchar(255),
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`(
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `content` varchar(255) not null,
  `room_slug` varchar(255) not null,
  `postby` varchar(255) not null,
  `images` varchar(255),
  `create_time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
DROP TABLE IF EXISTS `orders`;
create table `orders`(
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `room_number` varchar(255),
  `start_date` varchar(255),
  `end_date` varchar(255),
  `username` varchar(255),
   `user` varchar(255),
  `phone` varchar(255) ,
  PRIMARY KEY (`id`)
);
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '201',
    'single-201',
    'single',
    150,
    2,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '202',
    'single-202',
    'single',
    150,
    2,
    
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '203',
    'single-203',
    'single',
    150,
    2,
   'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '204',
    'single-204',
    'single',
    150,
    2,
  'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '205',
    'single-205',
    'single',
    180,
    3,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '206',
    'double-206',
    'double',
    250,
    5,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '207',
    'double-207',
    'double',
    200,
    4,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '208',
    'double-208',
    'double',
    250,
    5,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '301',
    'single-301',
    'single',
    150,
    2,
   'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '302',
    'single-302',
    'single',
    150,
    2,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '303',
    'single-303',
    'single',
    150,
    2,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '304',
    'single-304',
    'single',
    150,
    2,
'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '305',
    'double-305',
    'double',
    300,
    4,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '306',
    'double-306',
    'double',
    200,
    5,
    'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '307',
    'double-307',
    'double',
   220,
    3,
   'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
INSERT INTO
  rooms (
    name,
    slug,
    type,
    price,
    capacity,
    description,
    extras,
    images
  )
VALUES
  (
    '308',
    'double-308',
    'double',
    150,
    2,
   'Kích thước phòng:25m2',
    'Có bãi đỗ riêng miễn phí tại chỗ ,
Ổ điện gần giường,
WiFi miễn phí,
Hệ thống cách âm,
Điều hòa không khí,
Internet,
Phòng tắm riêng trong phòng,Tivi',
    ""
  );
  /*
  INSERT INTO
    comment (
     
      room_slug,
      postby,
      content
    )
  VALUES
    (
      "double-economy",
  "phong dep qua",
  "hoangvutinh"
    );
    INSERT INTO
    comment (room_slug, postby, content)
  VALUES
    (
      "single-economy",
      "phong dep qua",
      "hoangvutinh"
    ); 
  insert into order(room_number,room_slug,user) values (200,
  "phong dep qua",
  "hoangvutinh") */