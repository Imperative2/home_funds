/* eslint-disable default-case */
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  selectedHousehold: {},
  userHouseholds: new Map(),
};

const householdReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_HOUSEHOLDS: {
      let newUserHouseholdsMap = new Map();
      action.householdsList.forEach((household) => {
        newUserHouseholdsMap.set(household.householdId, household);
      });

      return { ...state, userHouseholds: newUserHouseholdsMap };
    }
    case actionTypes.ADD_HOUSEHOLD_TO_USER_HOUSEHOLDS: {
      let userHouseholdsMap = state.userHouseholds;
      userHouseholdsMap.set(action.household.householdId, action.household);

      return { ...state, userHouseholds: userHouseholdsMap };
    }
    case actionTypes.SET_SELECTED_HOUSEHOLD: {
      return { ...state, selectedHousehold: action.household };
    }
    case actionTypes.CLEAR_USER_HOUSEHOLDS: {
      let clearedMap = state.userHouseholds.clear();
      return { ...state, userHouseholds: clearedMap };
    }
  }

  return state;
};

export default householdReducer;
