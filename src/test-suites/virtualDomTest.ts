interface __React_Component {
    new(...args: any[]): __React_Component
}
declare var React: {
    createElement: Function,
    Component: __React_Component
};
declare var ReactDOM: any;
declare var cito: any;

import {createTestSuite} from './createTestSuite'

const availableVDOMTypes: string[] = ['div', 'span', 'a', 'button', 'p', 'h'];
const alphabet: string[] = _.range(26).map(idx => String.fromCharCode('a'.charCodeAt(0)));

function _randomType(): string {
    return availableVDOMTypes[_.random(availableVDOMTypes.length - 1)];
}
function _randomAlphabet(): string {
    return alphabet[_.random(alphabet.length - 1)];
}

function genRandomVDOM(fnCreateNode: (type: string, attrs: Object, ...children: any[]) => any, nodeSize: number, maxAttrSize: number = 5, maxChildSize: number = 10) {
    nodeSize = nodeSize - 1;
    const randomAttrs = _.range(_.random(maxAttrSize)).reduce((result) => {
            result[_randomAlphabet()] = _randomAlphabet();
            return result;
        }, {}),
        childSize = nodeSize === 0 ? 0 : _.random(1, Math.min(nodeSize, maxChildSize));
    nodeSize = nodeSize - childSize;
    const childSubnodeSizes: number[] = _.range(childSize).map((val, idx) => {
        let subnodeSize = Math.min(Math.round(_.random(nodeSize) / childSize), nodeSize);
        if (idx === childSize - 1) {
            subnodeSize = nodeSize;
        }
        nodeSize = nodeSize - subnodeSize;

        return subnodeSize;
    });

    return fnCreateNode(
        _randomType(),
        randomAttrs,
        ...childSubnodeSizes.map(subnodeSize => {
            return genRandomVDOM(fnCreateNode, subnodeSize + 1, maxAttrSize, maxChildSize);
        })
    );
}

let reactPlaceholder: HTMLElement = null;
let reactVDom: any = null;
let ReactDOMComponent: any = null;
let reactComponentInst: any = null;

let containerNode: HTMLElement = null;
let citoVDom: any = null;
let citoRenderedNode: any = null;
function citoVDomGenerator(): any {
    return citoVDom;
}

export default createTestSuite({
    name: 'Virtual DOM',
    desc: 'Virturl DOM implementation comparison.\nIt\'s not ready yet...',
    testCases: [{
        testCaseName: 'Cito',
        func() {
            cito.vdom.update(citoRenderedNode, citoVDomGenerator);
        },
        setup() {
            containerNode = document.createElement('div');
            containerNode.id = 'container-node';
            document.body.appendChild(containerNode);

            citoVDom = genRandomVDOM(
                (type: string, attrs: Object, ...children: any[]) => ({
                    tag: type,
                    attrs: attrs,
                    children: children
                }),
                10000
            );

            citoRenderedNode = cito.vdom.append(containerNode, citoVDomGenerator);
        },
        teardown() {
            cito.vdom.remove(citoRenderedNode);
            document.body.removeChild(containerNode);
        }
    }, {
        testCaseName: 'React',
        func() {
            reactComponentInst.setState({});
        },
        setup() {
            reactPlaceholder = document.createElement('div');
            reactPlaceholder.id = 'react-vdom-test-ph';
            document.body.appendChild(reactPlaceholder);

            ReactDOMComponent = class extends React.Component {
                constructor(...args: any[]) {
                    super(...args);
                    this._vdom = genRandomVDOM(
                        (type: string, attrs: Object, ...children: any[]) => React.createElement(type, attrs, children),
                        10000
                    );
                    reactComponentInst = this;
                }
                _vdom: any = null;
                render() {
                    return this._vdom;
                }
            };
            reactVDom = React.createElement(ReactDOMComponent);
            ReactDOM.render(reactVDom, reactPlaceholder);
        },
        teardown() {
            ReactDOM.unmountComponentAtNode(reactPlaceholder);
            document.body.removeChild(reactPlaceholder);
        }
    }],
    libs: [
        '//cdn.bootcss.com/react/15.3.2/react-with-addons.min.js',
        '//cdn.bootcss.com/react/15.3.2/react-dom.min.js',
        'https://cdn.rawgit.com/joelrich/citojs/master/dist/cito.min.js'
    ]
});
