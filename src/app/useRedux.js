import { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";

export const useRedux = (mapState, mapDispatch = () => {}, memo = []) => {
  const mapStateMemo = useCallback(mapState || (() => {}), memo);
  const stateData = useMappedState(mapStateMemo);

  const mapDispatchMemo = useCallback(mapDispatch, memo);
  const dispatch = useDispatch();
  const dispatchData = mapDispatchMemo(dispatch);

  return { ...stateData, ...dispatchData };
};
