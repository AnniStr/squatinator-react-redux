import reducer from "../reducers/workoutExercisesReducer";
import * as actions from "../actions/workoutExerciseActions";

describe("WorkoutExercise reducer", () => {
    test('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({"workoutExercises": [], "exerciseWorkout": undefined, "info": ''});
    });

    test("should handle GET_WORKOUT", () => {
        const startAction = {
            type: actions.GET_WORKOUT
        };
        expect(reducer({}, startAction)).toEqual({});
    });
    
    test("should handle GET_WORKOUT_EXERCISES", () => {
        const startAction = {
            type: actions.GET_WORKOUT_EXERCISES
        };
        expect(reducer({}, startAction)).toEqual({});
    });

    test("should handle DELETE_WORKOUT_EXERCISE", () => {
        const deleteAction = {
            type: actions.DELETE_WORKOUT_EXERCISE,
        };
        expect(reducer({}, deleteAction)).toEqual({});
    });
    
    test("should handle ADD_WORKOUT_EXERCISE", () => {
        const addAction = {
            type: actions.ADD_WORKOUT_EXERCISE,
        };
        expect(reducer({}, addAction)).toEqual({});
    });

    test("should handle PUT_WORKOUT_EXERCISE", () => {
        const putAction = {
            type: actions.PUT_WORKOUT_EXERCISE,
        };
        expect(reducer({}, putAction)).toEqual({});
    });

});