// https://github.com/davidflanagan/jstdg7/tree/master/ch09
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// https://stackoverflow.com/questions/2020670/javascript-object-id
// https://stackoverflow.com/questions/9455111/define-a-method-outside-of-class-definition/9455442
// https://stackoverflow.com/questions/38740610/object-getprototypeof-vs-prototype
// https://realpython.com/python-vs-javascript/#objects-and-constructors
// https://realpython.com/python-vs-javascript/#prototypes
// https://realpython.com/python-vs-javascript/#classes

// This is the latest way to code a class.
class Person1 {
  species = "Homo Sapiens";
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  toString() {
    return `${this.name}, ${this.age} years old`;
  }
}
let john = new Person1("John", 20);
console.log(john.toString());
console.log(john.__proto__);
console.log(Object.getPrototypeOf(john));
console.log(Object.getPrototypeOf(Person1.prototype));

// This is another way to code a class using
// the prototype keyword.
function Person2(name, age) {
  this.name = name;
  this.age = age;
}
Person2.prototype = {
  toString() {
    return `${this.name}, ${this.age} years old`;
  }
};
let james = new Person2("James", 25);
console.log(james.toString());
console.log(james.__proto__);
console.log(Object.getPrototypeOf(james));
console.log(Object.getPrototypeOf(Person2.prototype));

// This is another older way to code a class.
// The class name is not capitalised
// and the prototype keyword is not used.
function person3(name, age) {
  let p = Object.create(person3.methods);
  p.name = name;
  p.age = age;
  return p;
}
person3.methods = {
  toString() {
    return this.name + ", " + this.age
    + " years old";
  }
};
let joe = person3("Joe", 28);
console.log(joe.toString());
console.log(joe.__proto__);
console.log(Object.getPrototypeOf(joe));
console.log(Object.getPrototypeOf(person3.prototype));

class PersonWithPhone extends Person1 {
  constructor(name, age, phone) {
    super(name, age);
    this.phone = phone;
  }
  phoneNum() {
    return `Phone Number: ${this.phone}`;
  }
}
let jeremy = new PersonWithPhone("Jeremy", 32, 12345678);
console.log(jeremy.phoneNum());
console.log(jeremy.__proto__);
console.log(Object.getPrototypeOf(jeremy));
console.log(Object.getPrototypeOf(PersonWithPhone.prototype));
console.log(Object.getPrototypeOf(Person1.prototype));
console.log(PersonWithPhone.prototype == john.__proto__);
console.log(Person1.prototype === Person1.prototype);

class PersonWithSecondPhone extends PersonWithPhone {
  constructor(name, age, phone, secondPhone) {
    super(name, age, phone);
    this.secondPhone = secondPhone;
  }
  secondPhoneNum() {
    return `Second Phone Number: ${this.secondPhone}`;
  }
}
let jim = new PersonWithSecondPhone("Jim", 8, 1111, 2222);
console.log(jim.secondPhoneNum());
console.log(jim.phoneNum());
console.log(jim.toString());

let jen = new Person1("Jen", 60);
console.log(Person1.species);          // undefined
console.log(jen.species);              // Homo Sapiens
Person1.species2 = "Homo Sapiens 2"
console.log(Person1.species2);         // Homo Sapiens 2
console.log(jen.species2);             // undefined
console.log(jen.constructor.species2); // Homo Sapiens 2
jen.constructor.species2 = "Woman";
console.log(Person1.species2);         // Woman
console.log(jen.species2);             // undefined
console.log(jen.constructor.species2); // Woman
jen.species2 = "Blind Woman"
console.log(Person1.species2);         // Woman
console.log(jen.species2);             // Blind Woman
console.log(jen.constructor.species2); // Woman
console.log(Person1.prototype.species2);// undefined
Person1.prototype.species2 = "Man";
let jack = new Person1("Jack", 50);
console.log(Person1.species2);         // Woman
console.log(jen.species2);             // Blind Woman
console.log(jen.constructor.species2); // Woman
console.log(Person1.prototype.species2);// Man
console.log(jack.species2);             // Man
console.log(jack.constructor.species2); // Woman
jack.species2 = "Deaf Man"
console.log(jack.species2);             // Deaf Man
console.log(Person1.prototype.species2);// Man
