
import DATA from "./data.js";


/* Return an array of the SUNetIDs of the first N students in the data. */
const firstNSunets = (n) => {
    const students = DATA.students;
    const sunets = students.map(student => student.sunetid);
    return sunets.slice(0, n);
};

/* Return an Object mapping department names to codes of all departments with two-character codes. */
const shortDeptCodes = () => {
  const depts = DATA.depts;
  const shortCodes = {};
  depts.forEach(dept => {
    if (dept.code.length === 2) {
      shortCodes[dept.name] = dept.code;
    }
  });
  return shortCodes;
};

/* Return the average number of units completed by the students in the data */
const averageUnits = () => {
  const units = DATA.units;
  const unitValues = Object.values(units);
  const totalUnits = unitValues.reduce((acc, curr) => acc + curr);
  return totalUnits / unitValues.length;
};

/* Test the warmup functions */
const testWarmups = () => {
  
  /* These checks work by converting the return value into a string for comparison. We will talk more about JSON later in the course. */
  console.assert(JSON.stringify(firstNSunets(3)) === `["mchang91","neelk","jahchuen"]`,
    "firstNSunets() returned incorrect answer");
  console.assert(JSON.stringify(shortDeptCodes()) === `{"Computer Science":"CS","Electrical Engineering":"EE"}`,
    "shortDeptCodes() returned incorrect answer");
  console.assert(averageUnits().toFixed(3) === "176.000", "averageUnits() returned incorrect answer");

  console.log("Tests completed");

  
};
window.testWarmups = testWarmups;
