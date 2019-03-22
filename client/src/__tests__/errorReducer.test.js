import reducer from "../reducers/errorReducer";

describe("Error reducer", () => {
    test('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({});
    });

});