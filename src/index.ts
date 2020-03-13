import { createElement } from './vdom'

const vApp = createElement('div', {
    attrs: {
        id: 2
    },
    children: [
        createElement('img', {
            attrs: {
                src: 'xxx.com'
            }
        })
    ]
})

console.log(vApp)