import Student from "./student.js";

const $studentsList = document.getElementById('students-list');
const $studentsTable = document.querySelector('.students-table');
const $studentsListTHAll = $studentsTable.querySelectorAll('th');

const inputSurname = document.getElementById('input-surname');
const inputName = document.getElementById('input-name');
const inputLastname = document.getElementById('input-lastname');
const inputDate = document.getElementById('input-birthData');
const inputYearOfEnroll = document.getElementById('input-yearOfEnroll');
const inputFaculty = document.getElementById('input-faculty');

let error = document.querySelector('.form__errors');
let inputError = document.querySelector('.input__error');
let inputFilter = document.querySelectorAll('.filters__input');
let filterArray = [];
let filterValue;
let now = new Date();
let column = '';
let columnDir = true;
let listName = '';

let students = [
  new Student('Аникеева', 'Татьяна', 'Сергеевна', new Date(2000, 2, 20), 2018, 'психология'),
  new Student('Малышев', 'Николай', 'Андреевич', new Date(1998, 5, 11), 2016, 'экономика'),
  new Student('Михайлов', 'Антон', 'Аркадьевич', new Date(2002, 10, 22), 2020, 'экология')
];

function newStudentTR(student) {
  const $studentTR = document.createElement('tr');
  const $fioTD = document.createElement('td');
  const $birthDataTD = document.createElement('td');
  const $yearOfEnrollTD = document.createElement('td');
  const $facultyTD = document.createElement('td');

  $fioTD.textContent = student.fio;
  $birthDataTD.textContent = student.getBirthData() + student.getAge();
  $yearOfEnrollTD.textContent = student.yearsOfStudy();
  $facultyTD.textContent = student.faculty

  $studentTR.append($fioTD);
  $studentTR.append($facultyTD);
  $studentTR.append($birthDataTD);
  $studentTR.append($yearOfEnrollTD);

  return $studentTR;
};

function corrDate() {
  let inputDateVal = (new Date(inputDate.value)).getFullYear();
  const invalidDate = (new Date('1900-1-1')).getFullYear()

  if ((inputDateVal < now.getFullYear()) && (inputDateVal > invalidDate)) {
    inputDate.classList.remove('error');
    inputError.classList.remove('visible-error');
    return true;
  } else {
    inputDate.classList.add('error');
    inputDate.value = '';
    return false;
  }
};

function corrYearOfEnroll() {
  if ((2000 <= inputYearOfEnroll.value) && (inputYearOfEnroll.value < now.getFullYear())) {
    inputYearOfEnroll.classList.remove('error');
    inputError.classList.remove('visible-error');
    return true;
  } else {
    inputYearOfEnroll.classList.add('error');
    inputYearOfEnroll.value = '';
    return false;
  }
};

function correctStudent() {
  if ((inputSurname.value !== '') & (inputName.value !== '') & (inputLastname.value !== '') & (inputDate.value !== '') & (inputYearOfEnroll.value !== '') & (inputFaculty.value !== '')) {
    error.classList.remove('visible-error');

    if (corrDate() & corrYearOfEnroll()) {
      return true;
    } else {
      inputError.classList.add('visible-error');
    }

  } else {
    inputError.classList.remove('visible-error');
    error.classList.add('visible-error');
    return false;
  }
};

function addStudentsFilter(array) {
  let studentsListCopy = [...array];

  $studentsList.innerHTML = '';
  for (const student of studentsListCopy) {
    $studentsList.append(newStudentTR(student));
  }
};

function getFilterFio(arr) {
  if (filterArray.length === 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].fio.toUpperCase().split(' ').join('').includes(filterValue)) {
        filterArray.push(arr[i]);
      }
    }
    addStudentsFilter(filterArray);
  } else {
    for (let i = 0; i < filterArray.length; i++) {
      if (!filterArray[i].fio.toUpperCase().split(' ').join('').includes(filterValue)) {
        filterArray.splice(i, 1);
      }
    }
    addStudentsFilter(filterArray);
  }
};

function getFilterFaculty(arr) {
  if (filterArray.length === 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].faculty.toUpperCase().split(' ').join('').includes(filterValue)) {
        filterArray.push(arr[i]);
      }
    }
    addStudentsFilter(filterArray);
  } else {
    for (let i = 0; i < filterArray.length; i++) {
      if (!filterArray[i].faculty.toUpperCase().split(' ').join('').includes(filterValue)) {
        filterArray.splice(i, 1);
      }
    }
    addStudentsFilter(filterArray);
  }
};

function getFilterYearOfEnroll(arr) {
  if (filterArray.length === 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].yearsOfStudy().substring(0, 4).split(' ').join('').includes(filterValue)) {
        filterArray.push(arr[i]);
      }
    }
    addStudentsFilter(filterArray);
  } else {
    let filteredArrayByStartYear = [];

    for (let i = 0; i < filterArray.length; i++) {
      if (filterArray[i].yearsOfStudy().substring(0, 4).split(' ').join('').includes(filterValue)) {
        filteredArrayByStartYear.push(filterArray[i]);
      }
    }
    addStudentsFilter(filteredArrayByStartYear);
    filterArray = filteredArrayByStartYear;
  }
};

function getFilterYearOfGraduating(arr) {
  if (filterArray.length === 0) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].yearsOfStudy().substring(5, 9).split(' ').join('').includes(filterValue)) {
        filterArray.push(arr[i]);
      }
    }
    addStudentsFilter(filterArray);
  } else {
    let filteredArrayByEndYear = [];

    for (let i = 0; i < filterArray.length; i++) {
      if (filterArray[i].yearsOfStudy().substring(5, 9).split(' ').join('').includes(filterValue)) {
        filteredArrayByEndYear.push(filterArray[i]);
      }
    }
    addStudentsFilter(filteredArrayByEndYear);
    filterArray = filteredArrayByEndYear;
  }
};

function filteredStudent(el) {
  let studentsListCopy = [...students];

  if (el.target.value.length === 0) {
    $studentsList.innerHTML = '';
    filterArray = [];

    studentsListCopy.forEach(student => {
      let array = [];
      array.push(student);
      render(array);
    })
  } else {
    if (el.target.classList.contains('filter-fio')) {
      filterValue = el.target.value.toUpperCase().split(' ').join('');

      for (let i = 0; i < filterValue.length; i++) {
        filterArray = [];
        getFilterFio(studentsListCopy);
      }

    } else if (el.target.classList.contains('filter-faculty')) {
      filterValue = el.target.value.toUpperCase().split(' ').join('');

      for (let i = 0; i < filterValue.length; i++) {
        filterArray = [];
        getFilterFaculty(studentsListCopy);
      }

    } else if (el.target.classList.contains('filter-yearOfEnroll')) {
      filterValue = el.target.value.split(' ').join('');

      for (let i = 0; i < filterValue.length; i++) {
        filterArray = [];
        getFilterYearOfEnroll(studentsListCopy);
      }

    } else if (el.target.classList.contains('filter-yearOfGraduating')) {
      filterValue = el.target.value.split(' ').join('');

      for (let i = 0; i < filterValue.length; i++) {
        filterArray = [];
        getFilterYearOfGraduating(studentsListCopy);
      }
    }
  }
};

function sortedUsersList(arr, prop, dir) {
  const studentsListCopy = [...arr];

  return studentsListCopy.sort((studentA, studentB) => {
    if (!dir ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop])
      return -1;
  });
};

function render(arr) {
  let studentsListCopy = [...arr];

  studentsListCopy = sortedUsersList(students, column, columnDir);

  $studentsList.innerHTML = '';
  for (const student of studentsListCopy) {
    $studentsList.append(newStudentTR(student));
  }
};

$studentsListTHAll.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir;
    render(students);
  })
});

function clearInputs() {
  let allInput = document.querySelectorAll('.input');

  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = '';
    allInput[i].classList.remove('error');
  }
};

document.querySelector('.btn-valid').addEventListener('click', () => {
  if (correctStudent()) {
    let newStudent = new Student(
      inputSurname.value.trim(),
      inputName.value.trim(),
      inputLastname.value.trim(),
      new Date(inputDate.value.trim()),
      Number(inputYearOfEnroll.value.trim()),
      inputFaculty.value.trim()
    );

    students.push(newStudent);
    clearInputs();
    render(students);
  }
});

inputFilter.forEach((input) => {
  input.addEventListener('input', filteredStudent);
});

render(students);
