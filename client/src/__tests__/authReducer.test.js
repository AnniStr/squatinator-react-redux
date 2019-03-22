import reducer from "../reducers/authReducer";
import * as actions from "../actions/authentication";

describe("Authentication reducer", () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({"user": {}, "isAuthenticated": false});
    });

    test("should handle SET_CURRENT_USER", () => {
        const setAction = {
            type: actions.SET_CURRENT_USER
        };
        expect(reducer({}, setAction)).toEqual({});
    });

});