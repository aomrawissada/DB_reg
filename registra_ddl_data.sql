insert into Faculty(FID, FName)
values ('21', 'Faculty of Engineering');
insert into Faculty(FID, FName)
values ('22', 'Faculty of Arts');
insert into Faculty(FID, FName)
values ('23', 'Faculty of Science');
insert into Faculty(FID, FName)
values ('24', 'Faculty of Political Science');
insert into Faculty(FID, FName)
values ('25', 'Faculty of Architecture');
insert into Faculty(FID, FName)
values ('26', 'Faculty of Commerce and Accountancy');
insert into Faculty(FID, FName)
values ('27', 'Faculty of Education');
insert into Faculty(FID, FName)
values ('28', 'Faculty of Communication Arts');
insert into Faculty(FID, FName)
values ('29', 'Faculty of Economics');
insert into Faculty(FID, FName)
values ('30', 'Faculty of Medicine');
insert into Faculty(FID, FName)
values ('31', 'Faculty of Veterinary Science');
insert into Faculty(FID, FName)
values ('32', 'Faculty of Dentistry');
insert into Faculty(FID, FName)
values ('33', 'Faculty of Pharmaceutical Sciences');
insert into Faculty(FID, FName)
values ('34', 'Faculty of Law');
insert into Faculty(FID, FName)
values ('35', 'Faculty of Fine and Applied Arts');
insert into Faculty(FID, FName)
values ('37', 'Faculty of Allied Health Sciences');
insert into Faculty(FID, FName)
values ('38', 'Faculty of Psychology');
insert into Faculty(FID, FName)
values ('39', 'Faculty of Sports Science');
insert into Faculty(FID, FName)
values ('40', 'School of Agricultural');

insert into Department(FID, DID, DName)
values ('21', '00', 'Engineering');
insert into Department(FID, DID, DName)
values ('21', '03', 'Civil Engineering');
insert into Department(FID, DID, DName)
values ('21', '10', 'Computer Engineering');

insert into Teacher(TID, Password, Name, Surname, FFlag, Phone, Address, Birthdate, NID, Sex, Passport, BloodType, Ename, Ephone, FID, DID) 
values ('1111111111', 'password', 'Jane', 'Doe', false, '0999999999', '111 Phayathai Bangkok', '1970-01-01',
'1111111111111', 'F', null, 'A', 'John Doe', '0888888888', '21', '10');
insert into Teacher(TID, Password, Name, Surname, FFlag, Phone, Address, Birthdate, NID, Sex, Passport, BloodType, Ename, Ephone, FID, DID)
values ('2222222222', 'abcd', 'Paddington', 'Brown', true, '0900000000', 'Darkest Peru', '2000-02-14',
null, 'M', '123A123A123', 'B', 'Aunt Lucy', '0800000000', '21', '00');

insert into Student (SID, Password, Status, CurrentFlag, Name, Surname, FFlag, Phone, Address, Birthdate, 
NID, Sex, Passport, BloodType, Ename, Ephone, AdvisorTID, FID, DID)
values ('5830000021', 'notAPassword', 'B', true, 'Someone', 'notAlum', false, '0987654321', '987 somewhere', '1996-12-31',
'9999999999999', 'M', null, 'B', 'Some mom', '0123456789', '1111111111', '21', '10');
insert into Student (SID, Password, Status, CurrentFlag, Name, Surname, FFlag, Phone, Address, Birthdate, 
NID, Sex, Passport, BloodType, Ename, Ephone, AdvisorTID, FID, DID)
values('5931111121', '1234', 'B', true, 'Goku', 'Sun', true, '0912345678', 'Far East', '1999-01-01',
null, 'M', '111B111B111', 'O', 'Who?', '0000000000', '2222222222', '21', '00');

insert into Receipt(ReceiptNum, PayDate, PrintStatus)
values ('999999999999', '2017-04-18', false);
insert into Receipt(ReceiptNum, PayDate, PrintStatus)
values ('111111111111', '2017-03-12', true);

insert into Tuition(SID, Semester, ReceiptNum, Amount, Status)
values ('5830000021', '2/2016', '999999999999', 21000, true);
insert into Tuition(SID, Semester, ReceiptNum, Amount, Status)
values ('5931111121', '2/2016', '111111111111', 21000, true);
insert into Tuition(SID, Semester, ReceiptNum, Amount, Status)
values ('5830000021', '1/2016', null, 21000, false);

insert into S_Document(SID, DocID)
values ('5830000021', 'CR00');
insert into S_Document(SID, DocID)
values ('5830000021', 'CR01');

insert into T_Document(TID, DocID)
values ('1111111111', 'CR99');
insert into T_Document(TID, DocID)
values ('1111111111', 'CR98');

insert into Program(FID, DID, Pname, Year)
values ('21', '10', 'Bachelor of Engineering (Computer Engineering)', '2010');
insert into Program(FID, DID, Pname, Year)
values ('21', '10', 'Bachelor of Engineering (Computer Engineering)', '2016');
insert into Program(FID, DID, Pname, Year)
values ('21', '10', 'Master of Engineering (Computer Engineering)', '2015');

insert into Building(BldCode, BldName)
values ('EN100', 'Engineering Centennial Memorial Building');
insert into Building(BldCode, BldName)
values ('ENG3', 'Engineering 3');

insert into Room(BldCode, RoomNum, RoomType, Status)
values ('EN100', '405', 'Classroom', true);
insert into Room(BldCode, RoomNum, RoomType, Status)
values ('EN100', '406', 'Classroom', true);

insert into Course(CID, Semester, CName, Description, Credit,
BldCode, RoomNum, Date, StartTime, EndTime)
values ('2110422', '2/2016', 'Database Management Systems Design',
'placeholder', 3.0, 'EN100', '405', '2007-05-11', '0830', '1130');
insert into Course(CID, Semester, CName, Credit)
values ('2110332', '2/2016', 'Systems Analysis and Design',
3.0);

insert into Section(CID, Semester, SecNum)
values ('2110422', '2/2016', '1');
insert into Section(CID, Semester, SecNum)
values ('2110422', '2/2016', '2');
insert into Section(CID, Semester, SecNum)
values ('2110332', '2/2016', '1');
insert into Section(CID, Semester, SecNum)
values ('2110332', '2/2016', '2');

insert into Enroll(SID, CID, Semester, SecNum)
values ('5830000021', '2110422', '2/2016', '1');
insert into Enroll(SID, CID, Semester, SecNum)
values ('5830000021', '2110332', '2/2016', '2');

insert into Teach(TID, CID, Semester, SecNum)
values ('1111111111', '2110422', '2/2016', '2');
insert into Teach(TID, CID, Semester, SecNum)
values ('1111111111', '2110332', '2/2016', '2');

insert into PRequire(CID, Semester, PFID, PDID, Pname, Year)
values ('2110422', '2/2016', '21', '10', 'Bachelor of Engineering (Computer Engineering)', '2010');
insert into PRequire(CID, Semester, PFID, PDID, Pname, Year)
values ('2110332', '2/2016', '21', '10', 'Bachelor of Engineering (Computer Engineering)', '2010');

insert into Grade(SID, CID, Semester, Grade, WFlag)
values ('5830000021', '2110422', '2/2016', 3.5, false);
insert into Grade(SID, CID, Semester, Grade, WFlag)
values ('5830000021', '2110332', '2/2016', 3.0, false);

insert into Use_Room(CID, Semester, SecNum, BldCode, RoomNum, Day, StartTime, EndTime)
values ('2110422', '2/2016', '1', 'EN100', '405', 'MON', '0800', '0900');
insert into Use_Room(CID, Semester, SecNum, BldCode, RoomNum, Day, StartTime, EndTime)
values ('2110422', '2/2016', '2', 'EN100', '405', 'TUE', '0800', '0900');