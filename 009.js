// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_With_Private_Class_Features
class Person1 {
  constructor(name, age) {
    let _name = name;
    let _age = age;
    this.getName = _name;
    this.getAge = _age;
  }
  get myName() {
    return this.getName;
  }
  set myName(value) {
    this.getName = value;
  }
  get myAge() {
    return this.getAge;
  }
  set myAge(value) {
    this.getAge = value;
  }
}
let luke = new Person1("Luke", 25);
console.log(luke._name);   // undefined
console.log(luke.myName);  // Luke
console.log(luke.myAge);   // 25
luke.myAge = 35;
console.log(luke.myAge);   // 35


class Person2 {
  #name
  #age
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  get myName() {
    return this.#name;
  }
  set myName(value) {
    this.#name = value;
  }
  get myAge() {
    return this.#age;
  }
  set myAge(value) {
    this.#age = value;
  }
}
let sam = new Person2("Sam", 27);
console.log(sam.myName);   // Sam
console.log(sam.myAge);   // 27
sam.myAge = 37;
console.log(sam.myAge);   // 37
