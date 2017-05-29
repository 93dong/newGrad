SET NAMES UTF8;
DROP DATABASE IF EXISTS teacher;
CREATE DATABASE teacher CHARSET=UTF8;
USE teacher;

CREATE TABLE xt_user (
	  uid INT PRIMARY KEY AUTO_INCREMENT,
	  unumber VARCHAR(36),
	  uname VARCHAR(32),
	  upwd VARCHAR(32),
	  upowerID INT,
	  teacherId INT,
	  isapply INT
);
INSERT INTO xt_user VALUES
(NULL,'manager','管理员1','manager','0','13407606','0'),
(NULL, 'manager1','管理员2', '123456','0','13407608','0'),
(NULL, 'user1', '用户2','user1','1','13407609','0'),
(NULL, 'manager2', '管理员3','manager2','0','13407610','0');


CREATE TABLE xt_teacher(
  	tid INT PRIMARY KEY AUTO_INCREMENT,
	tname VARCHAR(64),
	tnation VARCHAR(64),
	tgender VARCHAR(32),
	tage INT,
	pic VARCHAR(32),
	tphone INT,
	gradSchool VARCHAR(256),
	tyear BIGINT,
	categaryID INT,
	recruitID INT
);
INSERT INTO xt_teacher VALUES
	('13407606','姚贝娜','汉族','女','35','img/姚贝娜.jpg','1234567891234','长治学院','20','1','1'),
	(NULL,'田亮','维吾尔族','男','35','img/田亮.jpg','1234567891234','太原理工','10','2','1'),
	(NULL,'田震','汉族','女','35','img/田震.jpg','1234567891234','山西大学','50','1','0'),
	(NULL,'汪涵','傣族','男','35','img/汪涵.jpg','1234567891234','北京大学','30','2','1'),
	(NULL,'谢娜','汉族','女','35','img/谢娜.jpg','1234567891234','烟台大学','50','3','0'),

	(NULL,'谢霆锋','汉族','男','27','img/谢霆锋.jpg','1234567891234','长治医学院','10','1','1'),
	(NULL,'姚笛','维吾尔族','女','27','img/姚笛.jpg','1234567891234','运城学院','40','2','0'),
	(NULL,'林心如','汉族','女','27','img/林心如.jpg','1234567891234','上海交通大学','10','1','1'),
	(NULL,'黄晓明','傣族','男','27','img/黄晓明.jpg','1234567891234','北京邮电大学','30','4','0'),
	(NULL,'赵薇','汉族','女','27','img/赵薇.jpg','1234567891234','上海戏剧学院','20','5','1'),

	('13508406','范冰冰','汉族','女','28','img/范冰冰.jpg','1234567891234','四川大学','40','5','2'),
	(NULL,'李宇春','汉族','女','28','img/李宇春.jpg','1234567891234','浙江大学','10','3','2'),
	(NULL,'谢依霖','汉族','女','28','img/谢依霖.jpg','1234567891234','香港大学','50','1','2'),
	(NULL,'张杰','布依族','男','28','img/张杰.jpg','1234567891234','哈弗大学','20','2','2'),
	(NULL,'文章','汉族','男','28','img/文章.jpg','1234567891234','河北大学','10','6','2'),

	(NULL,'何洁','汉族','女','31','img/何洁.jpg','1234567891234','东北大学','20','7','2'),
	(NULL,'汪峰','维吾尔族','男','31','img/汪峰.jpg','1234567891234','哈尔滨大学','40','6','2'),
	(NULL,'薛之谦','汉族','男','31','img/薛之谦.jpg','1234567891234','哈尔滨师范大学','20','7','2'),
	(NULL,'周笔畅','汉族','女','31','img/周笔畅.jpg','1234567891234','哈尔滨工业大学','10','6','2'),
	(NULL,'李晨','汉族','男','31','img/李晨.jpg','1234567891234','内蒙古大学','50','8','2'),

	(NULL,'田馥甄','傣族','女','45','img/田馥甄.jpg','1234567891234','四川大学','30','8','3'),
	(NULL,'张国荣','汉族','男','45','img/张国荣.jpg','1234567891234','哈尔滨大学','50','5','3'),
	(NULL,'本兮','汉族','女','45','img/本兮.jpg','1234567891234','香港大学','50','9','3'),
	(NULL,'何炅','傣族','男','45','img/何炅.jpg','1234567891234','北京邮电大学','30','9','3'),
	(NULL,'杜海涛','汉族','男','45','img/杜海涛.jpg','1234567891234','上海交通大学','10','9','3'),

	(NULL,'姚贝娜','汉族','女','35','img/姚贝娜.jpg','1234567891234','长治学院','20','1','3'),
	(NULL,'田亮','维吾尔族','男','35','img/田亮.jpg','1234567891234','太原理工','10','2','3'),
	(NULL,'田震','汉族','女','35','img/田震.jpg','1234567891234','山西大学','50','1','3'),
	(NULL,'汪涵','傣族','男','35','img/汪涵.jpg','1234567891234','北京大学','30','2','3'),
	(NULL,'谢娜','汉族','女','35','img/谢娜.jpg','1234567891234','烟台大学','50','3','3'),

	(NULL,'谢霆锋','汉族','男','27','img/谢霆锋.jpg','1234567891234','长治医学院','10','1','4'),
	(NULL,'姚笛','维吾尔族','女','27','img/姚笛.jpg','1234567891234','运城学院','40','2','4'),
	(NULL,'林心如','汉族','女','27','img/林心如.jpg','1234567891234','上海交通大学','10','1','4'),
	(NULL,'黄晓明','傣族','男','27','img/黄晓明.jpg','1234567891234','北京邮电大学','30','4','4'),
	(NULL,'赵薇','汉族','女','27','img/赵薇.jpg','1234567891234','上海戏剧学院','20','5','4'),

	(NULL,'范冰冰','汉族','女','28','img/范冰冰.jpg','1234567891234','四川大学','40','5','4'),
	(NULL,'李宇春','汉族','女','28','img/李宇春.jpg','1234567891234','浙江大学','10','3','4'),
	(NULL,'谢依霖','汉族','女','28','img/谢依霖.jpg','1234567891234','香港大学','50','1','4'),
	(NULL,'张杰','布依族','男','28','img/张杰.jpg','1234567891234','哈弗大学','20','2','4'),
	(NULL,'文章','汉族','男','28','img/文章.jpg','1234567891234','河北大学','10','6','4'),

	(NULL,'何洁','汉族','女','31','img/何洁.jpg','1234567891234','东北大学','20','7','5'),
	(NULL,'汪峰','维吾尔族','男','31','img/汪峰.jpg','1234567891234','哈尔滨大学','40','6','5'),
	(NULL,'薛之谦','汉族','男','31','img/薛之谦.jpg','1234567891234','哈尔滨师范大学','20','7','5'),
	(NULL,'周笔畅','汉族','女','31','img/周笔畅.jpg','1234567891234','哈尔滨工业大学','10','6','5'),
	(NULL,'李晨','汉族','男','31','img/李晨.jpg','1234567891234','内蒙古大学','50','8','5'),

	(NULL,'田馥甄','傣族','女','45','img/田馥甄.jpg','1234567891234','四川大学','30','8','5'),
	(NULL,'张国荣','汉族','男','45','img/张国荣.jpg','1234567891234','哈尔滨大学','50','5','5'),
	(NULL,'本兮','汉族','女','45','img/本兮.jpg','1234567891234','香港大学','50','9','5'),
	(NULL,'何炅','傣族','男','45','img/何炅.jpg','1234567891234','北京邮电大学','30','9','5'),
	(NULL,'杜海涛','汉族','男','45','img/杜海涛.jpg','1234567891234','上海交通大学','10','9','5'),

	(NULL,'姚贝娜','汉族','女','35','img/姚贝娜.jpg','1234567891234','长治学院','20','1','6'),
	(NULL,'田亮','维吾尔族','男','35','img/田亮.jpg','1234567891234','太原理工','10','2','6'),
	(NULL,'田震','汉族','女','35','img/田震.jpg','1234567891234','山西大学','50','1','6'),
	(NULL,'汪涵','傣族','男','35','img/汪涵.jpg','1234567891234','北京大学','30','2','6'),
	(NULL,'谢娜','汉族','女','35','img/谢娜.jpg','1234567891234','烟台大学','50','3','6'),

	(NULL,'谢霆锋','汉族','男','27','img/谢霆锋.jpg','1234567891234','长治医学院','10','1','6'),
	(NULL,'姚笛','维吾尔族','女','27','img/姚笛.jpg','1234567891234','运城学院','40','2','6'),
	(NULL,'林心如','汉族','女','27','img/林心如.jpg','1234567891234','上海交通大学','10','1','6'),
	(NULL,'黄晓明','傣族','男','27','img/黄晓明.jpg','1234567891234','北京邮电大学','30','4','6'),
	(NULL,'赵薇','汉族','女','27','img/赵薇.jpg','1234567891234','上海戏剧学院','20','5','6'),

	(NULL,'范冰冰','汉族','女','28','img/范冰冰.jpg','1234567891234','四川大学','40','5','1'),
	(NULL,'李宇春','汉族','女','28','img/李宇春.jpg','1234567891234','浙江大学','10','3','1'),
	(NULL,'谢依霖','汉族','女','28','img/谢依霖.jpg','1234567891234','香港大学','50','1','1'),
	(NULL,'张杰','布依族','男','28','img/张杰.jpg','1234567891234','哈弗大学','20','2','1'),
	(NULL,'文章','汉族','男','28','img/文章.jpg','1234567891234','河北大学','10','6','1'),

	(NULL,'何洁','汉族','女','31','img/何洁.jpg','1234567891234','东北大学','20','7','1'),
	(NULL,'汪峰','维吾尔族','男','31','img/汪峰.jpg','1234567891234','哈尔滨大学','40','6','1'),
	(NULL,'薛之谦','汉族','男','31','img/薛之谦.jpg','1234567891234','哈尔滨师范大学','20','7','1'),
	(NULL,'周笔畅','汉族','女','31','img/周笔畅.jpg','1234567891234','哈尔滨工业大学','10','6','1'),
	(NULL,'李晨','汉族','男','31','img/李晨.jpg','1234567891234','内蒙古大学','50','8','1'),

	(NULL,'田馥甄','傣族','女','45','img/田馥甄.jpg','1234567891234','四川大学','30','8','3'),
	(NULL,'张国荣','汉族','男','45','img/张国荣.jpg','1234567891234','哈尔滨大学','50','5','3'),
	(NULL,'本兮','汉族','女','45','img/本兮.jpg','1234567891234','香港大学','50','9','3'),
	(NULL,'何炅','傣族','男','45','img/何炅.jpg','1234567891234','北京邮电大学','30','9','3'),
	(NULL,'杜海涛','汉族','男','45','img/杜海涛.jpg','1234567891234','上海交通大学','10','9','3');



CREATE TABLE xt_categary(
  	cid INT PRIMARY KEY AUTO_INCREMENT,
	cname VARCHAR(256),
	academy  VARCHAR(1024),
	stunum INT,
	cintro VARCHAR(8192)
);
INSERT INTO xt_categary VALUES
	('1','计算机系','长治学院','252','计算机系介绍'),
	(NULL,'音乐舞蹈系','长治学院','252','音乐舞蹈系介绍'),
	(NULL,'中文系','长治学院','252','中文系介绍'),
	(NULL,'数学系','长治学院','252','数学系介绍'),
	(NULL,'化学系','长治学院','252','化学系介绍'),
	(NULL,'生物系','长治学院','252','生物系介绍'),
	(NULL,'体育系','长治学院','252','体育系介绍'),
	(NULL,'物理系','长治学院','252','物理系介绍'),
	(NULL,'建筑系','长治学院','252','建筑系介绍');


CREATE TABLE xt_recruit(
	rid INT PRIMARY KEY AUTO_INCREMENT,
	rname VARCHAR(256),
	rtime BIGINT,
	rfabu INT,
	rintro VARCHAR(8192),
	rnum INT,
	requestid INT
);
    INSERT INTO xt_recruit VALUES
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1'),
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1'),
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1'),
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1'),
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1'),
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1'),
    	(NULL,'网络工程师','12345618648613','13407606','网络工程师','2','1');

    CREATE TABLE xt_request(
          	rid INT PRIMARY KEY AUTO_INCREMENT,
        	r1 VARCHAR(2048),
        	r2 VARCHAR(2048),
        	r3 VARCHAR(2048),
        	r4 VARCHAR(2048),
        	r5 VARCHAR(2048)
        );
        INSERT INTO xt_request VALUES
        	(NULL,'网络工程师','1496095726241','管理员1','网络工程师','网络工程师'),
        	(NULL,'网络工程师','1496096226241','管理员1','网络工程师','网络工程师'),
        	(NULL,'网络工程师','1496196226241','管理员1','网络工程师','网络工程师'),
        	(NULL,'网络工程师','1496096226241','管理员1','网络工程师','网络工程师'),
        	(NULL,'网络工程师','1496096226041','管理员1','网络工程师','网络工程师'),
        	(NULL,'网络工程师','1496096326241','管理员1','网络工程师','网络工程师'),
        	(NULL,'网络工程师','1497096226241','管理员1','网络工程师','网络工程师');

