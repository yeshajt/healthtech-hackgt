const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total w/ tip', ()=> {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total w/ default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('Should convert fahrenheit to celsuis', () => {
    const celsius = fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test('Should convert celsuis to fahrenheit', () => {
    const fahrenheit = celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Should add two numbers', (done) => {
    add(2, 4).then((answer) => {
        expect(answer).toBe(6)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const addition = await add(2, 3)
    expect(addition).toBe(5)
})