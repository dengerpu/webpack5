import './assets/css/index.css'
const h1 = document.createElement('h1')
h1.innerHTML = 'index.html'
h1.classList.add('red')
document.body.appendChild(h1)
console.log('hello, 更改了')

const button = document.createElement('button')
button.onclick = function() {
    fetch('/api/hello').then(response => response.text()).then(result => {
        console.log(result)
    })
}
button.innerHTML = '点我发送请求'
document.body.appendChild(button)