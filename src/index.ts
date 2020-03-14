import { createElement, render, mount, diff } from './VDOM/VDOM'



const createvApp = (count: number) => createElement('div', {
    attrs: {
        id: 2,
    },
    children: [
        'Hello,World',
        String(count),
        createElement('img', {
            attrs: {
                src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif'
            }
        })
    ]
})




let vApp = createvApp(0)
const $app = render(vApp)
let $rootEl = mount($app, document.querySelector('#app'))

setInterval(() => {
    const n = Math.floor(Math.random() * 10)
    const vNewApp = createvApp(n);
    const patch = diff(vApp, vNewApp)
    $rootEl = patch($rootEl) as HTMLElement | Text
    vApp = vNewApp
}, 1000)

