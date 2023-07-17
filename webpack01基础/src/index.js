import Hello from './hello'
import imgSrc from './assets/image/webpack.png'
import svgSrc from './assets/image/webpack-logo.svg'
import text from './assets/test.txt'
import jpgSrc from './assets/image/test.jpg'

Hello()

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
document.body.appendChild(div)

const img2 = document.createElement('img')
img2.src = jpgSrc
img2.style.cssText = 'width: 200px; height: 40px'
document.body.appendChild(img2)