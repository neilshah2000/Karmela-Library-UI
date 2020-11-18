import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CheckoutModal from "./CheckoutModal";

// let container = null;
// beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });

// afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });

// const book = {
//     name: 'test book',
//     authorNames: ['author1', 'author2']
// }

// const checkouModalProps = {
//     show: true,
//     onClose: () => {},
//     books: [],
//     onConfirm: () => {}
// }

it("renders with a name", () => {
    // act(() => {
    //     render(<CheckoutModal {...checkouModalProps} />, container);
    // });
    // expect(container.querySelector('h5')).toBe('test book');
});