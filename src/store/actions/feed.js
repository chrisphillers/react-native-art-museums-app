import { fetchFeed } from "../../api/api";
import { delayMock, fetchFeedMock } from "../../api/mock";

// action types

export const FETCH_FEED__SENT = "FETCH_FEED__SENT";
export const FETCH_FEED__FULFILLED = "FETCH_FEED__FULFILLED";
export const FETCH_FEED__REJECTED = "FETCH_FEED__REJECTED";
export const TOGGLE_FEED_VIEW = "TOGGLE_FEED_VIEW";
export const SET_VISIBLE_INDEX = "SET_VISIBLE_INDEX";
export const REFRESH_FEED__SENT = "REFRESH_FEED__SENT";
export const SORT_FEED = "SORT_FEED";

// action creators

export const refreshFeed = (extra, sort, sortOrder) => async (
  dispatch,
  abort
) => {
  dispatch({ type: REFRESH_FEED__SENT });
  try {
    const results = await fetchFeed(null, sort, sortOrder, extra);
    !abort.value &&
      dispatch({
        type: FETCH_FEED__FULFILLED,
        payload: {
          ...results
        }
      });
  } catch (err) {
    !abort.value &&
      dispatch({ type: FETCH_FEED__REJECTED, payload: err.message });
  }
};

export const sortFeed = (sort, sortOrder, extra = "") => async (
  dispatch,
  abort
) => {
  dispatch({ type: SORT_FEED, payload: { sort, sortOrder } });
  try {
    const results = await fetchFeed(null, sort, sortOrder, extra);
    !abort.value &&
      dispatch({
        type: FETCH_FEED__FULFILLED,
        payload: {
          ...results
        }
      });
  } catch (err) {
    !abort.value &&
      dispatch({ type: FETCH_FEED__REJECTED, payload: err.message });
  }
};

export const toggleFeedView = () => ({ type: TOGGLE_FEED_VIEW });

export const setVisibleIndex = index => ({
  type: SET_VISIBLE_INDEX,
  payload: index
});

export const loadFeed = (extra, next) => async (dispatch, abort) => {
  dispatch({ type: FETCH_FEED__SENT });
  try {
    const results = next
      ? await fetchFeed(next)
      : await fetchFeed(null, "totalpageviews", "desc", extra);

    !abort.value &&
      dispatch({
        type: FETCH_FEED__FULFILLED,
        payload: {
          ...results
        }
      });
  } catch (err) {
    !abort.value &&
      dispatch({ type: FETCH_FEED__REJECTED, payload: err.message });
  }
};
