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
                src: 'https://images.unsplash.com/photo-1584135034886-36cfdd7b19ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
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

