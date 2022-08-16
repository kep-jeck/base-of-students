export default class Student {
  constructor(surname, name, lastname, birthData, yearOfEnroll, faculty) {
    this.surname = surname
    this.name = name
    this.lastname = lastname
    this.birthData = birthData
    this.yearOfEnroll = yearOfEnroll
    this.faculty = faculty
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  yearsOfStudy() {
    const currentTime = new Date()

    let yearOfEnd = this.yearOfEnroll + 4
    let years = this.yearOfEnroll + '-' + yearOfEnd
    let result = currentTime.getFullYear() - this.yearOfEnroll

    if (currentTime.getMonth() + 1 >= 9 && (result > 4) || (result > 4)){
      return years + ` (закончил)`
    } else {
      let value = currentTime.getFullYear() - this.yearOfEnroll
      return years + ` (${value} курс)`
    }
  }

  getBirthData() {
    const yyyy = this.birthData.getFullYear()
    let mm = this.birthData.getMonth() + 1
    let dd = this.birthData.getDate()

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    return dd + '.' + mm + '.' + yyyy + ' '
  }

  getAge() {
    const today = new Date()
    let age = today.getFullYear() - this.birthData.getFullYear()
    let m = today.getMonth() - this.birthData.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < this.birthData.getDate())) {
      age--
    }

    return `(${age} лет)`
  }

  yearOfGraduating() {
    let year = this.yearOfEnroll + 4
    return year
  }
}

