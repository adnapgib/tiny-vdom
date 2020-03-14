import { render, mount } from './Render'
import { createElement } from '../VNode/VNode'

test('should return a real DOM elementNode', () => {
    expect(render(createElement('div')))
        .toEqual(document.createElement('div'))
    expect(render(createElement('div', { attrs: { id: 2 } })))
        .toEqual((() => { const el = document.createElement('div'); el.setAttribute('id', '2'); return el })())
    expect(render(createElement('div', {
        attrs: { id: 2 }, children: [
            "hello,world",
            createElement('div')
        ]
    }))).toEqual((() => {
        const el = document.createElement('div')
        el.setAttribute('id', '2')
        el.appendChild(document.createTextNode("hello,world"))
        el.appendChild(document.createElement('div'))
        return el
    })()
    )
})