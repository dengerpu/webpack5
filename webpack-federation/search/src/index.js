Promise.all([import('nav/header'), import('home/HomeList')])
.then(([{default: Header}, {default: HomeList}]) => {
    document.body.appendChild(Header())
    document.body.innerHTML += HomeList(4)
    console.log('执行了')
    console.log(Header, HomeList)
})