let nombre: string = "Roberto";
let active: boolean = true;

let stringArray: string[] = ["Hola", "Muy", "Buenas"];
console.log(stringArray);

//objetos de la forma "convencional"
let person: {
  name: string;
  age: number;
};

person = {
  name: "Roberto",
  age: 30,
};

function greeting(name: string) {
  return `Hi ${name}`;
}

//inferencia de tipos
let counter = 1;
console.log(typeof counter);

//definir tipos explícitamente
let state: string = "Montevideo";

//especificar tipo de retorno de una función
function increment(counter: number): number {
  return counter++;
}

interface Json {
  toJson(): string;
}

class Person implements Json {
  ssn: string;
  firstName: string;
  lastName: string;

  constructor(ssn: string, firstName: string, lastName: string) {
    this.ssn = ssn;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  toJson() {
    return JSON.stringify(this);
  }
}

let sebas: Person = new Person("No sé qué es esto", "Sebas", "Algo");
console.log(sebas.getFullName());

//no tienen funcionalidades, sirven para definir los tipos de los parámetros de funciones
//sabemos que si una función recibe una mascota va a tener que seguir estas convenciones de tipos
interface Pet {
  name: string;
  age: number;
  readonly owner: Person; //readonly
  veterinary?: Person; //propiedad opcional
  isOwner(name: string): boolean; //function in an interface
}

//se puede usar & para mixear parámetros de interfaces
interface BusinessPartner {
  name: string;
  credit: number;
}

interface Identity {
  id: number;
  name: string;
}

interface Contact {
  email: string;
  phone: string;
}

// tienen que implementar todo lo de estas interfaces
type Employee = Identity & Contact;
type Customer = BusinessPartner & Contact;

//si borramos una nos da error
let e: Employee = {
  id: 100,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(408)-897-5684",
};

//podemos usar generics para tolerar todos los tipos y poder retornarlos sin perder el type-safe
//se puede usar con varios tipos a la vez
function getRandomElement<T>(items: T[]): T {
  let randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

//acá con dos tipos a la vez
function merge<U, V>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2,
  };
}

let result = merge({ name: "John" }, { jobTitle: "Frontend Developer" });

console.log(result);
