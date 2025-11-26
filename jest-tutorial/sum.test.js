const sum = require('./sum');

//podemos usar toSum para testear que una operación dé un resultado esperado
test('adds 2 + 2 to equal 4', () => {
    expect(sum(2, 2)).toBe(4);
});

//podemos usar toEqual para testear que un objeto/valor sea igual a otro
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

//podemos usar .not para probar el opuesto
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

//también tenemos todos estos toBe que chequean un montón de cosas relacionadas a tipos y booleanos
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

//hay matchers para números
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3); // >
  expect(value).toBeGreaterThanOrEqual(3.5); // >=
  expect(value).toBeLessThan(5); // <
  expect(value).toBeLessThanOrEqual(4.5); // <=

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4); // ===
  expect(value).toEqual(4); // ===
});

//para números con coma
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

//también tenemos matchers para strings
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

//también hay matchers para arrays e iterables
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});

//excepciones
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow(); //hay que ejecutar la función adentro, no solo poner el nombre... expect (() => funcion())
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK!');
  expect(() => compileAndroidCode()).toThrow(/JDK/);

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});

