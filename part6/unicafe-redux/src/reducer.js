const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  total: 0,
  average: 0,
  positivePercentage: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GOOD":
      let goodState = JSON.parse(JSON.stringify(state));
      goodState.good++;
      goodState.total++;
      goodState.average =
        (goodState.good * 1.0 + goodState.bad * -1.0) / goodState.total;
      goodState.positivePercentage = (goodState.good / goodState.total) * 100.0;
      return goodState;
    case "OK":
      let okState = state;
      okState.ok++;
      okState.total++;
      okState.average =
        (okState.good * 1.0 + okState.bad * -1.0) / okState.total;
      okState.positivePercentage = (okState.good / okState.total) * 100.0;
      return okState;
    case "BAD":
      let badState = JSON.parse(JSON.stringify(state));
      badState.bad++;
      badState.total++;
      badState.average =
        (badState.good * 1.0 + badState.bad * -1.0) / badState.total;
      badState.positivePercentage = (badState.good / badState.total) * 100.0;
      return badState;
    case "ZERO":
      let nullState = JSON.parse(JSON.stringify(state));
      nullState.good = 0;
      nullState.ok = 0;
      nullState.bad = 0;
      nullState.total = 0;
      nullState.average = 0;
      nullState.positivePercentage = 0;
      return nullState;
    default:
      return state;
  }
};

export default counterReducer;
