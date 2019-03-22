import reducer from "../reducers/workoutsReducer";
import * as actions from "../actions/workoutActions";

describe("Workout reducer", () => {
    test('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({"workouts": []});
    });

    test("should handle GET_WORKOUTS", () => {
        const startAction = {
            type: actions.GET_WORKOUTS
        };
        expect(reducer({}, startAction)).toEqual({});
    });
    
    test("should handle DELETE_WORKOUT", () => {
        const deleteAction = {
            type: actions.DELETE_WORKOUT
        };
        expect(reducer({}, deleteAction)).toEqual({});
    });

    test("should handle ADD_WORKOUT", () => {
        const addAction = {
            type: actions.ADD_WORKOUT,
        };
        expect(reducer({}, addAction)).toEqual({});
    })

});