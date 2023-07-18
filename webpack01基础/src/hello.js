function Hello() {
    console.log('hello webpack~~~')
}

function getString() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello__webpack')
        },2000)
    })
}

async function helloWebpack() {
    let string = await getString()
    console.log(string)
}
helloWebpack()

export default Hello