function testConsole(){
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
    let persons = [juan, {name:'Laura', email:'laura@gmail.com'}]
    console.table(persons);

    console.time("timer");
    setTimeout(function () {console.timeEnd("timer")},300);
    console.timeLog("timer");
}

function testConstructors(){
    function Person(name, email){
        this.name = name;
        this.email = email;
    }

    let juan = new Person('Juan', 'juan@gmail.com');
    let laura = new Person('Laura', 'laura@gmail.com');

    console.group(juan, laura);
}

//testConsole();
//testConstructors();




