self.onmessage = ({data: { question } }) => {
    console.log('接受到的参数', question)
    self.postMessage({
        answer: 100
    })
}