import reducer from "../reducers/exerciseReducer";
import * as actions from "../actions/exerciseActions";

describe("Exercise reducer", () => {
    test('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({"exercises": [], "info": ''});
    });

    test("should handle ADD_EXERCISE", () => {
        const addAction = {
            type: actions.ADD_EXERCISE
        };
        expect(reducer({}, addAction)).toEqual({});
    });
    
    test("should handle GET_EXERCISE", () => {
        const startAction = {
            type: actions.GET_EXERCISE
        };
        expect(reducer({}, startAction)).toEqual({});
    });

    test("should handle DELETE_EXERCISE", () => {
        const deleteAction = {
            type: actions.DELETE_EXERCISE,
        };
        expect(reducer({}, deleteAction)).toEqual({});
    })

});