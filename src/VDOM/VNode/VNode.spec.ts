import { createElement } from './VNode'

test('should return a virtual dom object', () => {
    expect(createElement('div'))
        .toEqual({
            tagName: 'div',
            attrs: {},
            children: []
        })
    expect(createElement('div', { attrs: { id: 2 } }))
        .toEqual({
            tagName: 'div',
            attrs: { id: 2 },
            children: []
        })
    expect(createElement('div', {
        attrs: { id: 2 }, children: [
            "hello,world",
            createElement('div')
        ]
    })).toEqual({
        tagName: 'div',
        attrs: { id: 2 },
        children: [
            "hello,world",
            {
                tagName: 'div',
                attrs: {},
                children: []
            }
        ]
    })

})

