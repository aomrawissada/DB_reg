use registra;

set foreign_key_checks = 0;

drop table if exists Faculty;
create table Faculty (
	FID varchar(2) not null,
	FName varchar(50) not null,
	primary key (FID)
) engine=InnoDB default charset=utf8;

drop table if exists Department;
create table Department (
	FID varchar(2) not null,
	DID varchar(2) not null,
	DName varchar(50) not null,
	primary key (FID, DID),
	constraint dep_fk_faculty foreign key (FID)
	references Faculty(FID) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Teacher;
create table Teacher (
	TID varchar(10) not null,
    Password varchar(30) not null,
	Name varchar(20) not null,
	Surname varchar(30) not null,
	FFlag boolean not null,
	Phone varchar(10),
	Address varchar(100),
	Birthdate date,
	NID varchar(13),
	Sex varchar(1),
	Passport varchar(15),
	BloodType varchar(2),
	Ename varchar(50),
	Ephone varchar(10),
	FID varchar(2),
	DID varchar(2),
	primary key (TID),
	constraint t_fk_department foreign key (FID, DID)
	references Department(FID, DID) on delete set null
) engine=InnoDB default charset=utf8;

drop table if exists Student;
create table Student (
	SID varchar(10) not null,
    Password varchar(30) not null,
    Status varchar(1),
	CurrentFlag boolean not null,
	Name varchar(20) not null,
	Surname varchar(30) not null,
	FFlag boolean not null,
	Phone varchar(10),
	Address varchar(100),
	Birthdate date,
	NID varchar(13),
	Sex varchar(1),
	Passport varchar(15),
	BloodType varchar(2),
	Ename varchar(50),
	Ephone varchar(10),
	AdvisorTID varchar(10),
	FID varchar(2),
	DID varchar(2),
	primary key (SID),
	constraint std_fk_advisor foreign key (AdvisorTID) references Teacher(TID),
	constraint std_fk_department foreign key (FID, DID)
	references Department(FID, DID) on delete set null
) engine=InnoDB default charset=utf8;
create index std_advisor_index on Student(AdvisorTID);

drop table if exists Receipt;
create table Receipt (
	ReceiptNum varchar(12) not null,
	PayDate date not null,
	PrintStatus boolean not null,
	primary key (ReceiptNum)
) engine=InnoDB default charset=utf8;

drop table if exists Tuition;
create table Tuition (
	SID varchar(10) not null,
	Semester varchar(6) not null,
	ReceiptNum varchar(12) default null,
	Amount int,
	Status boolean not null,
	primary key (SID, Semester),
	constraint tuition_fk_student foreign key (SID)
    references Student(SID) on delete cascade,
	constraint fk_receipt foreign key (ReceiptNum)
    references Receipt(ReceiptNum) on delete set null
) engine=InnoDB default charset=utf8;

drop table if exists S_Document;
create table S_Document (
	SID varchar(10) not null,
	DocID varchar(4) not null,
	primary key (SID, DocID),
	constraint fk_s_doc foreign key (SID)
    references Student(SID) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists T_Document;
create table T_Document (
	TID varchar(10) not null,
	DocID varchar(4) not null,
	primary key (TID, DocID),
	constraint fk_t_doc foreign key (TID)
    references Teacher(TID) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Program;
create table Program (
	FID varchar(2) not null,
	DID varchar(2) not null,
	Pname varchar(100) not null,
	Year varchar(4) not null,
	primary key (FID, DID, Pname, Year),
	constraint p_fk_department foreign key (FID, DID)
	references Department(FID, DID) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Building;
create table Building (
	BldCode varchar(5) not null,
	BldName varchar(60) not null,
	primary key (BldCode)
) engine=InnoDB default charset=utf8;

drop table if exists Room;
create table Room (
	BldCode varchar(5) not null,
	RoomNum varchar(5) not null,
	RoomType varchar(10),
	Status boolean not null,
	primary key (BldCode, RoomNum),
	constraint room_fk_bld foreign key (BldCode)
	references Building(BldCode) on update cascade on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Course;
create table Course (
	CID varchar(7) not null,
	Semester varchar(6) not null,
	CName varchar(50) not null,
	Description varchar(200) default null,
	Credit double not null,
	BldCode varchar(5) default null,
	RoomNum varchar(5) default null,
	Date date default null,
	StartTime time default null,
	EndTime time default null,
	primary key (CID, Semester),
	constraint c_fk_room foreign key (BldCode, RoomNum)
	references Room(BldCode, RoomNum) on update cascade on delete set null
) engine=InnoDB default charset=utf8;
create index coursename_index on Course(CID, Semester, CName);

drop table if exists Section;
create table Section (
	CID varchar(7) not null,
	Semester varchar(6) not null,
	SecNum varchar(2) not null,
	primary key (CID, Semester, SecNum),
	constraint section_fk foreign key (CID, Semester)
	references Course(CID, Semester) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Enroll;
create table Enroll (
	SID varchar(10) not null,
	CID varchar(7) not null,
	Semester varchar(6) not null,
	SecNum varchar(2) not null,
	primary key (SID, CID, Semester, SecNum),
	constraint enroll_fk_student foreign key (SID)
	references Student(SID) on delete cascade,
	constraint enroll_fk_sec foreign key (CID, Semester, SecNum)
	references Section(CID, Semester, SecNum) on delete cascade
) engine=InnoDB default charset=utf8;

create trigger ins_grade_trigger after insert on Enroll
	for each row
    insert into Grade(SID, CID, Semester, Grade, WFlag)
	values (new.SID, new.CID, new.Semester, null, false);


drop table if exists Teach;
create table Teach (
	TID varchar(10) not null,
	CID varchar(7) not null,
	Semester varchar(6) not null,
	SecNum varchar(2) not null,
	primary key (TID, CID, Semester, SecNum),
	constraint teach_fk_tid foreign key (TID)
	references Teacher(TID) on delete cascade,
	constraint teach_fk_sec foreign key (CID, Semester, SecNum)
	references Section(CID, Semester, SecNum) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists PRequire;
create table PRequire (
	CID varchar(7) not null,
	Semester varchar(6) not null,
	PFID varchar(2) not null,
	PDID varchar(2) not null,
	Pname varchar(50) not null,
	Year varchar(4) not null,
	primary key (CID, Semester, PFID, PDID, Pname, Year),
	constraint req_fk_course foreign key (CID, Semester)
	references Course(CID, Semester) on delete cascade,
	constraint req_fk_program foreign key (PFID, PDID, Pname, Year)
	references Program(FID, DID, Pname, Year) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Grade;
create table Grade (
	SID varchar(10) not null,
	CID varchar(7) not null,
	Semester varchar(6) not null,
	Grade double,
	WFlag boolean not null,
	primary key (SID, CID, Semester),
	constraint grade_fk_std foreign key (SID)
	references Student(SID) on delete cascade,
	constraint grade_fk_course foreign key (CID, Semester)
	references Course(CID, Semester) on delete cascade
) engine=InnoDB default charset=utf8;

drop table if exists Use_Room;
create table Use_Room (
	CID varchar(7) not null,
	Semester varchar(6) not null,
	SecNum varchar(2) not null,
	BldCode varchar(5) not null,
	RoomNum varchar(5) not null,
	Day varchar(3) not null,
	StartTime time not null,
	EndTime time not null,
	primary key (CID, Semester, SecNum, BldCode, RoomNum, Day),
	constraint use_fk_sec foreign key (CID, Semester, SecNum)
	references Section(CID, Semester, SecNum) on delete cascade,
	constraint use_fk_room foreign key (BldCode, RoomNum)
	references Room(BldCode, RoomNum) on delete cascade
) engine=InnoDB default charset=utf8;