import './assets/css/index.css'
import { add } from '@/utils/add'
// 开启 css 模块后，可以导入模块
import style from './assets/css/index.css'
import $ from 'jquery'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration)
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError)
        })
    })
}


document.body.classList.add(style.bg)

console.log($)

console.log(add(1,2))

const h1 = document.createElement('h1')
h1.innerHTML = 'index.html'
h1.classList.add(style.red)
document.body.appendChild(h1)
console.log('hello, 更改了')

const div = document.createElement('div')
div.innerHTML = `<div class="${style.box}">div里面的内容</div>`
div.classList.add(style.flex)
div.children[0].classList.add(style.box)
document.body.appendChild(div)

const button = document.createElement('button')
button.onclick = function() {
    fetch('/api/hello').then(response => response.text()).then(result => {
        console.log(result)
    })
}
button.innerHTML = '点我发送请求'
document.body.appendChild(button)

const worker = new Worker(new URL('./work.js', import.meta.url))
worker.postMessage({
    question: '请告诉我你想要的数字'
})
worker.onmessage = ({ data: {answer} }) => {
    console.log(answer)
}