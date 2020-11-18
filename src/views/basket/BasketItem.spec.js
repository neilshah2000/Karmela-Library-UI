import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import BasketItem from "./BasketItem";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const book = {
    name: 'test book',
    authorNames: ['author1', 'author2']
}

it("renders with a name", () => {
    act(() => {
        render(<BasketItem book={book} />, container);
    });
    expect(container.querySelector('h5')).toBe('test book');
});