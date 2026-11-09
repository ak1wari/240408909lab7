import { useEffect, useReducer } from "react";

const initialState = { loading: true, error: null, data: null };

function fetchReducer(state, action) {
  switch (action.type) {
    case "START":
      return { loading: true, error: null, data: null };
    case "SUCCESS":
      return { loading: false, error: null, data: action.payload };
    case "ERROR":
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

export function useFetch(fetchFunction, dependencies = []) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    dispatch({ type: "START" });

    Promise.resolve()
      .then(() => fetchFunction(controller.signal))
      .then((data) => {
        if (active) {
          dispatch({ type: "SUCCESS", payload: data });
        }
      })
      .catch((error) => {
        if (active && error.name !== "AbortError") {
          dispatch({
            type: "ERROR",
            payload: error.message || "Something went wrong"
          });
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [fetchFunction, ...dependencies]);

  return state;
}
