class Department {
  constructor(name, code) {
    this.name = name;
    this.code = code;
    this.students = [];
  }

  declare(student) {
    if (student.dept === this.code) {
      return; 
    }

    if (student.dept !== null) {
      throw new Error(
        "Student is already declared under a different department."
      );
    }

    student.dept = this.name;
    this.students.push(student);
  }
  listStudent() {
    return this.students
  }
  graduate() {
    const graduates = this.students.filter(student => student.canGraduate());
   return graduates
  }
}

export default Department;
