import Student from './student.js';
import Department from './dept.js';

export default class App {
  constructor() {
    this.students = {};
    this.depts = {};
    this.units = {};
    this.handleDeclare = this.handleDeclare.bind(this);
    this.handleGraduate = this.handleGraduate.bind(this);
    this.handleListStudent = this.handleListStudent.bind(this);
    this._form = document.forms.declarationForm
    this._form.declareBtn.addEventListener('click', this.handleDeclare);
    this._form.graduateBtn.addEventListener('click', this.handleGraduate);
    this._form.listBtn.addEventListener('click', this.handleListStudent);
  }

  loadData(data) {
    data.students.forEach(studentData => {
      const { givenName, surname, sunetid } = studentData;
      this.students[sunetid] = new Student(sunetid, givenName, surname);
    });

    data.depts.forEach(deptData => {
      const { name, code } = deptData;
      this.depts[code] = new Department(name, code);
    });

    Object.entries(data.units).forEach(([sunetid, unitsCompleted]) => {
      const student = this.students[sunetid];
      if (student) {
        student.addUnits(unitsCompleted);
      }
    });
  }
  
  declare(sunetid, deptCode) {
    const student = this.students[sunetid];
    const dept = this.depts[deptCode];
    if (!student) {
        throw new Error(`Student with sunetid ${sunetid} not found.`);
    }
    if (!dept) {
        throw new Error(`Department with code ${deptCode} not found.`);
    }
    dept.declare(student); 
    return student;
}
  listingStudent(deptCode){
    const dept = this.depts[deptCode];
    if(this.students.length === 0){
      throw new Error('No students found');
    }
    return dept.listStudent()
  }

  graduate(deptCode) {
    const dept = this.depts[deptCode];
    if (!dept) {
      throw new Error(`Department with code ${deptCode} not found.`);
    }
    return dept.graduate();
  }
  handleDeclare() {
    const sunetidInput = document.getElementById('sunetid').value;
    const deptCodeInput = document.getElementById('deptCode').value;
    try {
      const student = this.declare(sunetidInput, deptCodeInput);
     
      alert(`${student.givenName} ${student.surname} (${student.sunetid}) declared ${this.depts[deptCodeInput].name}!`);
    } catch (error) {
      alert(error.message);
    }
  }
  handleListStudent() {
    const deptCodeInput = document.getElementById('deptCode').value;
    try {
        const studentsList = this.listingStudent(deptCodeInput);
        const tbody = document.querySelector('#departmentTable tbody');
        tbody.innerHTML = '';
        studentsList.forEach(student => {
            const row = tbody.insertRow();
            const deptCell = row.insertCell();
            deptCell.textContent = student.dept;
            
            const sunetidCell = row.insertCell();
            sunetidCell.textContent = student.sunetid;
            
            const givenNameCell = row.insertCell();
            givenNameCell.textContent = student.givenName;
            
            const surnameCell = row.insertCell();
            surnameCell.textContent = student.surname;
            
            const unitsCompletedCell = row.insertCell();
            unitsCompletedCell.textContent = student.unitsCompleted;
        });
    } catch (error) {
        alert('Please enter departmen you want to list');
    }
}

  handleGraduate() {
    const deptCodeInput = document.getElementById('deptCode').value;
    try {
      const graduates = this.graduate(deptCodeInput);
      let message = '';
      graduates.forEach(student => {
     
        message += `<li>${student.givenName} ${student.surname} - (${student.sunetid})</li>`;
      });
      document.getElementById('graduateStudent').innerHTML = message;
    } catch (error) {
      alert(error.message);
    }
  }
}
