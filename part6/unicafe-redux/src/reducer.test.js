import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    bad: 0,
    ok: 0,
    total: 0,
    average: 0,
    positivePercentage: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
      total: 1,
      average: 1,
      positivePercentage: 100,
    });
  });

  test("bad is incremented and then both good and ok are incremented", () => {
    const action = {
      type: "BAD",
    };

    const state = counterReducer(initialState, { type: "ZERO" });

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
      total: 1,
      average: -1,
      positivePercentage: 0,
    });

    const secondState = counterReducer(newState, { type: "GOOD" });
    const thirdState = counterReducer(secondState, { type: "OK" });
    expect(thirdState).toEqual({
      good: 1,
      ok: 1,
      bad: 1,
      total: 3,
      average: 0,
      positivePercentage: 33.33333333333333,
    });

    const nullState = counterReducer(thirdState, { type: "ZERO" });
    expect(nullState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
      total: 0,
      average: 0,
      positivePercentage: 0,
    });
  });
});
