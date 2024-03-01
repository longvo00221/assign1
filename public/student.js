class Student {
  constructor(sunetid, givenName, surname) {
    this.sunetid = sunetid;
    this.givenName = givenName;
    this.surname = surname;
    this.dept = null;
    this.unitsCompleted = 0;
    this.isAlum = false;
  }

  addUnits(units) {
    this.unitsCompleted += units;
  }
  fullName() {
    return `${this.givenName} ${this.surname}`;
  }
  toString() {
    return `${this.fullName()} (${this.sunetid})`;
  }
  canGraduate() {
    if (this.isAlum) {
      throw new Error("Student has already graduated.");
    }
    if (this.dept === null || this.unitsCompleted < 180) {
      return false;
    }
    return true;
  }
}
export default Student;
