import { VElementNode, VNode, VDOMBuilderOption, DOMNodeType } from '../VDOM.type'
import { render } from '../Render/Render'

const diff = (oldVTree: VNode, newVTree?: VNode) => {
    //if newVTree === undefined just remove the real dom node
    if (newVTree === undefined) {
        return ($node: DOMNodeType) => {
            $node.remove()
            return undefined
        }
    }

    if (typeof oldVTree === 'string' || typeof newVTree === 'string') {
        /*
            case 1: oldVTree and new VTree are different type of vnode
            case 2: oldVTree and new Vtree are same string type,but not the same one
            both case just return a patch function that render newVTree
        */
        if (oldVTree !== newVTree) {
            return ($node: DOMNodeType) => {
                const $newNode = render(newVTree)
                $node.replaceWith($newNode)
                return $newNode
            }
        } else { //it means oldVTree and newVTree are both string type and they are equal
            return ($node: DOMNodeType) => $node //just do nothing here
        }
    }

    if (oldVTree.tagName !== newVTree.tagName) {
        //in this case,oldVTree and newVTree are totally different VNodes
        return ($node: DOMNodeType) => {
            const $newNode = render(newVTree)
            $node.replaceWith($newNode)
            return $newNode
        }
    }

    const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs)
    const patchChildren = diffChildren(oldVTree.children, newVTree.children)

    return ($node: DOMNodeType) => {
        patchAttrs($node as HTMLElement)
        patchChildren($node)
        return $node
    }
}


const diffAttrs = (oldAttrs: object, newAttrs: object) => {
    const patches: Array<($node: HTMLElement) => (HTMLElement)> = []
    Object
        .keys(newAttrs)
        .forEach(key => {
            patches.push($node => { //setting newAttrs here
                $node.setAttribute(key, (newAttrs as any)[key])
                return $node
            })
        })

    Object
        .keys(oldAttrs)
        .forEach(key => {
            if (!(key in newAttrs)) { //removing attrs here
                patches.push($node => {
                    $node.removeAttribute(key)
                    return $node
                })
            }
        })

    return ($node: HTMLElement) => {
        for (const patch of patches) {
            patch($node) //run patch queue here
        }
        return $node
    }
}

const diffChildren = (oldVChildren: Array<VNode>, newVChildren: Array<VNode>) => {
    const childPatches: any = []
    oldVChildren.forEach((oldVChild, i) => { //diff all oldVChild here
        childPatches.push(diff(oldVChild, newVChildren[i]))
    })

    const additionalPatches: Array<($node: DOMNodeType) => DOMNodeType> = []
    for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
        additionalPatches.push($node => {
            $node.appendChild(render(additionalVChild))
            return $node
        })
    }

    return ($parent: DOMNodeType) => {
        $parent.childNodes.forEach(($child, i) => { //patch children
            childPatches[i]($child)
        })

        for (const patch of additionalPatches) {
            patch($parent)
        }
        return $parent
    }
}

export { diff }
