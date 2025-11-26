//SETUP (una vez)
beforeAll(() => {
    console.log('arrancan los tests!');
})

afterAll(() => {
    console.log('terminaron todos los tests!')
})

//SETUP (cada test)
beforeEach(() => {
    console.log('arranca test nuevo!');
})

afterEach(() => {
    console.log('terminó un test!')
})

function fetchData(success){
    return new Promise(function(fulfill, reject) {
        setTimeout( function() {
            if(success){
                fulfill('peanut butter');
            }else{
                reject('error');
            }
        })
    });
}

// así testeamos funciones asincrónicas, las llamamos y hacemos then para acceder a la data que retornan (si son Promises)
// podemos usar test.only(...) para testear UN SOLO TEST, importante para ver si falla por alguna dependencia con otro test, vale la pena probarlos solos si fallan
test('the data is peanut butter', () => {
  return fetchData(true).then(data => {
    expect(data).toBe('peanut butter');
  });
});

// sino podemos usar async await (más limpio)
test('the data is peanut butter', async () => {
  const data = await fetchData(true);
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions();
  try {
    await fetchData(true);
  } catch (error) {
    expect(error).toMatch('error');
  }
});

//podemos usar .resolves para testear también, si no resolvea falla automáticamente el test
test('the data is peanut butter', () => {
  return expect(fetchData(true)).resolves.toBe('peanut butter');
});

//y acá para cuando da error
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
