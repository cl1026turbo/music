SET NAMES UTF8;
DROP DATABASE IF EXISTS shop;
CREATE DATABASE shop CHARSET=UTF8;
USE shop;

/**笔记本电脑**/
CREATE TABLE shop_laptop(
  lid INT PRIMARY KEY AUTO_INCREMENT,
  family_id INT,              #所属型号家族编号
  title VARCHAR(128),         #主标题
  subtitle VARCHAR(128),
  price DECIMAL(10,2),        #价格
  promise VARCHAR(64),        #服务承诺
  spec VARCHAR(64),           #规格/颜色
  details VARCHAR(1024)      #产品详细说明
);
CREATE TABLE shop_laptop_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);
/**笔记本电脑图片**/
CREATE TABLE shop_laptop_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  laptop_id INT,              #笔记本电脑编号
  sm VARCHAR(128),            #小图片路径
  md VARCHAR(128),            #中图片路径
  lg VARCHAR(128)             #大图片路径
);

/**用户信息**/
/*用户信息表*/
CREATE TABLE user_info(
	uid INT NOT NULL PRIMARY KEY AUTO_INCREMENT, #用户编号
	uname VARCHAR(32),                           #用户名称9**
	upwd  VARCHAR(32),                           #用户密码
	user_name VARCHAR(32),                       #用户真实姓名
	avatar VARCHAR(128),                         #用户图像
	gender TINYINT DEFAULT 1,                    #用户性别
	birth BIGINT,                                #用户生日
	phone VARCHAR(11),                           #手机号
	email VARCHAR(32)                            #邮箱
);

/**收货地址信息**/
CREATE TABLE shop_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  tag VARCHAR(16),            #标签名

  is_default BOOLEAN          #是否为当前用户的默认收货地址
);

/**购物车条目**/
CREATE TABLE shop_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);

/**用户订单**/
CREATE TABLE shop_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address_id INT,
  status INT,             #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT    #签收时间
)AUTO_INCREMENT=10000000;

/**用户订单**/
CREATE TABLE shop_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT               #购买数量
);

/****首页轮播广告商品****/
CREATE TABLE shop_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64)
);

/****首页商品****/
CREATE TABLE shop_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),
  pic VARCHAR(128),
  price DECIMAL(10,2),
  href VARCHAR(128)
);

/*******************/
/******数据导入******/
/*******************/
/**笔记本电脑型号家族**/
INSERT INTO shop_laptop_family VALUES
(NULL,'耳机'),
(NULL,'乐器'),
(NULL,'杯子');
/**笔记本电脑**/
INSERT INTO shop_laptop VALUES
(1,1,'伯朗 i12触控真无线蓝牙耳机蓝牙5.0苹果安卓通用','【赠送硅胶保护套+登山扣】智能触控；兼容IOS、安卓系统；自动配对；蓝牙5.0；双耳通话',128,'*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货','红色',' <div class="t_imgs">
                    <p><img src="img/shop/detail/a.jpg" alt=""></p>
                    <p><img src="img/shop/detail/b.jpg" alt=""></p>
                    <p><img src="img/shop/detail/c.jpg" alt=""></p>
                    <p><img src="img/shop/detail/l.jpg" alt=""></p>
                    <p><img src="img/shop/detail/e.jpg" alt=""></p>
                    <p><img src="img/shop/detail/f.jpg" alt=""></p>
                    <p><img src="img/shop/detail/g.jpg" alt=""></p>
                    <p><img src="img/shop/detail/h.jpg" alt=""></p>
                    <p><img src="img/shop/detail/i.jpg" alt=""></p> 
                    <p><img src="img/shop/detail/j.jpg" alt=""></p>
                    <p><img src="img/shop/detail/k.jpg" alt=""></p>     
                </div> '),
(2,1,'伯朗 i12触控真无线蓝牙耳机蓝牙5.0苹果安卓通用','【赠送硅胶保护套+登山扣】智能触控；兼容IOS、安卓系统；自动配对；蓝牙5.0；双耳通话',128,'*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货','白色',' <div class="t_imgs">
                    <p><img src="img/shop/detail/a.jpg" alt=""></p>
                    <p><img src="img/shop/detail/b.jpg" alt=""></p>
                    <p><img src="img/shop/detail/c.jpg" alt=""></p>
                    <p><img src="img/shop/detail/l.jpg" alt=""></p>
                    <p><img src="img/shop/detail/e.jpg" alt=""></p>
                    <p><img src="img/shop/detail/f.jpg" alt=""></p>
                    <p><img src="img/shop/detail/g.jpg" alt=""></p>
                    <p><img src="img/shop/detail/h.jpg" alt=""></p>
                    <p><img src="img/shop/detail/i.jpg" alt=""></p> 
                    <p><img src="img/shop/detail/j.jpg" alt=""></p>
                    <p><img src="img/shop/detail/k.jpg" alt=""></p>     
                </div> '),
(3,1,'伯朗 i12触控真无线蓝牙耳机蓝牙5.0苹果安卓通用','【赠送硅胶保护套+登山扣】智能触控；兼容IOS、安卓系统；自动配对；蓝牙5.0；双耳通话',128,'*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货','绿色',' <div class="t_imgs">
                    <p><img src="img/shop/detail/a.jpg" alt=""></p>
                    <p><img src="img/shop/detail/b.jpg" alt=""></p>
                    <p><img src="img/shop/detail/c.jpg" alt=""></p>
                    <p><img src="img/shop/detail/l.jpg" alt=""></p>
                    <p><img src="img/shop/detail/e.jpg" alt=""></p>
                    <p><img src="img/shop/detail/f.jpg" alt=""></p>
                    <p><img src="img/shop/detail/g.jpg" alt=""></p>
                    <p><img src="img/shop/detail/h.jpg" alt=""></p>
                    <p><img src="img/shop/detail/i.jpg" alt=""></p> 
                    <p><img src="img/shop/detail/j.jpg" alt=""></p>
                    <p><img src="img/shop/detail/k.jpg" alt=""></p>     
                </div> '),                                
(4,2,'网易云音乐 蓝调布鲁斯口琴 经典红色 音乐的力量','10孔C调 初学者适用 经典红色 精心设计 音色出众',58,'*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货','红色','<div class="t_imgs">
                    <p><img src="img/shop/detail/2-a.jpg" alt=""></p>
                    <p><img src="img/shop/detail/2-b.jpg" alt=""></p> 
                </div> '),
(5,2,'网易云音乐 蓝调布鲁斯口琴 经典红色 音乐的力量','10孔C调 初学者适用 经典红色 精心设计 音色出众',58,'*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货','白色','<div class="t_imgs">
                    <p><img src="img/shop/detail/2-a.jpg" alt=""></p>
                    <p><img src="img/shop/detail/2-b.jpg" alt=""></p> 
                </div> '),
(6,3,'网易云音乐不锈钢保温杯','云村经典配色，保温杯也可以轻巧方便。',59,'*退货补运费 *30天无忧退货 *48小时快速退款 *72小时发货','黑色','<div class="t_imgs">
                    <p><img src="img/shop/detail/3-a.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-b.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-c.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-d.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-e.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-f.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-g.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-h.jpg" alt=""></p>
                    <p><img src="img/shop/detail/3-i.jpg" alt=""></p> 
                    <p><img src="img/shop/detail/3-j.jpg" alt=""></p>
                </div> ');                      
/**笔记本电脑图片**/
INSERT INTO shop_laptop_pic VALUES
(NULL, 1, 'img/shop/detail/011-s.jpg','img/shop/detail/011-m.jpg','img/shop/detail/011-l.jpg'),
(NULL, 1, 'img/shop/detail/012-s.jpg','img/shop/detail/012-m.jpg','img/shop/detail/012-l.jpg'),
(NULL, 1, 'img/shop/detail/013-s.jpg','img/shop/detail/013-m.jpg','img/shop/detail/013-l.jpg'),
(NULL, 1, 'img/shop/detail/014-s.jpg','img/shop/detail/014-m.jpg','img/shop/detail/014-l.jpg'),
(NULL, 1, 'img/shop/detail/015-s.jpg','img/shop/detail/015-m.jpg','img/shop/detail/015-l.jpg'),
(NULL, 4, 'img/shop/detail/021-s.jpg','img/shop/detail/021-m.jpg','img/shop/detail/021-l.jpg'),
(NULL, 4, 'img/shop/detail/022-s.jpg','img/shop/detail/022-m.jpg','img/shop/detail/022-l.jpg'),
(NULL, 4, 'img/shop/detail/023-s.jpg','img/shop/detail/023-m.jpg','img/shop/detail/023-l.jpg'),
(NULL, 4, 'img/shop/detail/024-s.jpg','img/shop/detail/024-m.jpg','img/shop/detail/024-l.jpg'),
(NULL, 4, 'img/shop/detail/025-s.jpg','img/shop/detail/025-m.jpg','img/shop/detail/025-l.jpg');
/****首页商品****/
INSERT INTO shop_index_product VALUES
(NULL, '伯朗 i12触控真无线蓝牙耳机蓝牙5.0苹果安卓通用', 'img/shop/index/01.jpg', 99, 'product_details.html?lid=1'),
(NULL, '网易云音乐 蓝调布鲁斯口琴 经典红色 音乐的力量', 'img/shop/index/02.jpg', 69, 'product_details.html?lid=2'),
(NULL, '伯朗 i10max真无线蓝牙耳机苹果安卓通用','img/shop/index/3.jpg', 59, 'product_details.html?lid=3'),
(NULL, '网易云音乐联名款无线蓝牙耳机TWS1', 'img/shop/index/04.jpg', 298, 'product_details.html?lid=4'),
(NULL, '网易云音乐经典红系列 黑胶裸背硬面笔记本', 'img/shop/index/05.jpg', 29, 'product_details.html?lid=5'),
(NULL, '伯朗 i9s真无线蓝牙耳机v5.0双耳通话苹果安卓通用', 'img/shop/index/06.jpg', 89, 'product_details.html?lid=6');

