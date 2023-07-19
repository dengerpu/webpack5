function getComponent() {
    return import('lodash').then(({default: _}) => {
        const element = document.createElement('div')
        element.innerHTML = _.join(['Hello', 'webpack'], ' ')
        element.style.cssText = 'color: yellow'
        return element
    }).catch((error) => {
        alert(error)
    })
}

getComponent().then(elm => {
    document.body.appendChild(elm)
})