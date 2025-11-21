function testConsole() {
    // En browsers se ven distintos a los logs:
    console.log('Log');
    console.debug('Debug');
    console.warn('WARNING!');
    console.error('ERROR');

    let juan = {
        name: 'Juan',
        email: 'Juan@gmail.com'
    };

    // Printeamos el objeto
    console.dir(juan);

    //Printear arrays como tablas
    let persons = [juan, { name: 'Laura', email: 'laura@gmail.com' }]
    console.table(persons);

    console.time("timer");
    setTimeout(function () { console.timeEnd("timer") }, 300);
    console.timeLog("timer");
}

function testConstructors() {
    function Person(name, email) {
        this.name = name;
        this.email = email;
    }

    let juan = new Person('Juan', 'juan@gmail.com');
    let laura = new Person('Laura', 'laura@gmail.com');

    console.group(juan, laura);
}

function es6(initialParam = 'inicializado sin necesidad de argumentos') { //podemos inicializar los parámetros así si no recibimos arg
    const array = ['juan', 'roberto', 'ricardo'];
    for (const elem of array) { // [index, elem] of array.entries() para acceder al index también
        console.log(elem);
    }

    console.log("El máximo sin usar apply: " + Math.max(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); //antes Math.max.apply(Math, array)
    console.log(...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // lo pasa de array a números separados por coma

    let arr = [1, 2, 3];
    arr.push(...[4, 5, 6]); // podemos usar este mismo operando '...' para evitar usar apply.
    console.log(arr);

    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    let arr3 = [7, 8, 9];

    console.log([...arr1, ...arr2, ...arr3]); //podemos usarlo para concatenar incluso

    const obj = {
        foo() { //podemos declarar funciones así y no como foo: function() {}
            console.log('function called from object');
        }
    }

    obj.foo();

    class Person {
        constructor(name) { // EN ES6 HAY CONSTRUCTOREEEES!!!!!!!!!!!!!!!!!!!!!111!!!1
            this.name = name;
        }

        describe() {
            console.log("Person name is: " + this.name);
        }
    }

    const juan = new Person('Juan');
    juan.describe();

    class Employee extends Person { //AHORA HAY HERENCIA!!!!!!!11!!
        constructor(name, company) {
            super(name);
            this.company = company;
        }

        describe() {
            console.log('Im: ' + this.name + " and I work for: " + this.company);
        };
    }

    // También podemos usar herencia para hacer errores custom

    const juanConLaburo = new Employee('JuanPala', 'XmartLabs');
    juanConLaburo.describe();

    const map = new Map(); //Ahora existen los Maps, este es un ejemplo de uno
    function countWords(word) {
        const count = map.get(word) || 0;
        map.set(word, count + 1);
    }

    const arrayArgs = Array.from(arguments); // Ya no es necesario usar Array.prototype.slice.call(...) para convertir arraylikes a arrays
    const arrayChars = [...'abc'] //['a', 'b', 'c']

    const firstName = 'Jane'; //Los template literals son strings que se pueden extender por múltiples líneas
    console.log(`Hello ${firstName}!
    How are you
    today?`);

    const iterable = ['a', 'b'];
    const [x, y] = iterable; //x = 'a', y = 'b'

    class Prefixer {
        constructor(prefix) {
            this.prefix = prefix;
        }
        prefixArray(arr) {
            return arr.map(x => this.prefix + x); // Si no usamos arrow function da error ya que se shadowea el this
        }                                         
    }

    //Se pueden usar las arrow functions para handlear eventos y no tener que usar bind(this)
    //obj.on('anEvent', event => this.handleEvent(event));

    const plus1 = x => x + 1;
    console.log(`plus1 de 0: ${plus1(0)}, debería ser 1`);

    const filterNotEven = arr => {return arr.filter(elem => {return elem % 2 === 0})};
    const arrOnlyEven = filterNotEven([1,2,3,4,5,6,7,8,9,10]);
    console.log(`Should only contain even numbers: ${arrOnlyEven}`);

    setTimeout(() => {
        console.log('timeoutttttttt');
    }, 500); //espera 500 ms y despues mete una task al loop, no significa que se ejecute despues de 500 ms
   
    // el loop obra de formas misteriosas y espero acordarme porque me da pereza escribirlo acá :)
}

//testConsole();
//testConstructors();
es6();




