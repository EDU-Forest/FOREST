import StudentInfoCard from "@/components/Card/StudentInfoCard";
import { StudentListText, StudentListTitle, StudentListWrapper } from "./ClassStudentList.style";

const studentList: Student[] = [
  {
    userId: 1,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 2,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 3,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 4,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 5,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 6,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 7,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 8,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
  {
    userId: 9,
    name: "최규림",
    age: 28,
    email: "ssafy124@gmail.com",
    phone: "010-1234-5678",
  },
];
export default function ClassStudentList() {
  return (
    <>
      <StudentListTitle>학생 리스트 </StudentListTitle>
      <StudentListText>(20)</StudentListText>
      <StudentListWrapper>
        {studentList.map((item) => (
          <StudentInfoCard studentInfo={item} />
        ))}
      </StudentListWrapper>
    </>
  );
}
