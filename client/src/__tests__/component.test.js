import React from "react";
import { create } from "react-test-renderer";

import Home from "../components/Home";
import Welcome from "../components/Welcome";

describe("Home component", () => {
    test("it matches the snapshot", () => {
        const component = create(<Home/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe("Welcome component", () => {
    test("it matches the snapshot", () => {
        const component = create(<Welcome/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});