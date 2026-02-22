import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private stundents = [
    { id: 1, name: 'Abc', age: 21 },
    { id: 2, name: 'Def', age: 22 },
  ];

  getAllStudents() {
    return this.stundents;
  }

  getStudentById(id: number) {
    const student = this.stundents.find((std) => std.id === id);

    if (!student) throw new NotFoundException('Student not found');

    return student;
  }

  createStudent(data: { name: string; age: number }) {
    const newStudent = {
      id: this.stundents.length + 1,
      ...data,
    };
    this.stundents.push(newStudent);
    return newStudent;
  }

  updateStudent(id: number, data: { name: string; age: number }) {
    const studentIndex = this.stundents.findIndex((std) => std.id === id);
    if (studentIndex === -1) throw new NotFoundException('Student not found');
    this.stundents[studentIndex] = {
      id,
      ...data,
    };
    return this.stundents[studentIndex];
  }

  patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
    const student = this.getStudentById(id);
    Object.assign(student, data);
    return student;
  }

  deleteStudent(id: number) {
    const studentIndex = this.stundents.findIndex((std) => std.id === id);
    if (studentIndex === -1) throw new NotFoundException('Student not found!');
    const deletedStudent = this.stundents.splice(studentIndex, 1);
    return { message: 'Deleted Successfully', student: deletedStudent };
  }
}
