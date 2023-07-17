import Hello from './hello'
import imgSrc from './assets/image/webpack.png'
import svgSrc from './assets/image/webpack-logo.svg'
import text from './assets/test.txt'
import jpgSrc from './assets/image/test.jpg'
import './assets/css/style.css'
import './assets/css/style.less'

Hello()

document.body.classList.add('bg')

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)

const svgImg = document.createElement('img')
svgImg.src = svgSrc
svgImg.style.cssText = 'width: 200px; height: 40px'
document.body.appendChild(svgImg)

const div = document.createElement('div')
div.textContent = text
div.style.cssText = 'background: aliceblue'
div.classList.add('hello')
div.classList.add('div-bg')
document.body.appendChild(div)

const img2 = document.createElement('img')
img2.src = jpgSrc
img2.style.cssText = 'width: 200px; height: 40px'
document.body.appendChild(img2)

const span = document.createElement('span')
span.classList.add('icon')
span.innerHTML = '&#xe668;'
document.body.appendChild(span)