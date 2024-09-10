import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    updateDisplayData,
    handleChangeState,
    updateCurrentState,
  } from "../store/slices/singleBetSlice";
import { betLookup } from '../helper';

function useSubmitEvent() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userInfo.userId);
  
    const handleOnSubmit = async (betAction, params) => {
      const response = await betLookup[betAction]?.callApi(params);
      dispatch(
        updateDisplayData({
          type: betAction,
          request: JSON.parse(params),
          response: response,
        })
      );
      if (response.status === "0") {
        dispatch(handleChangeState(betAction));
      }
    };
  
    const handleActionClick = async (key) => {
      if (!userId) {
        alert("Please insert User Id then click save");
        return;
      }
      const data = betLookup[key]?.getSampleData();
      dispatch(updateDisplayData({ type: key, request: data, response: null }));
      dispatch(updateCurrentState(key));
    };

    return {handleOnSubmit, handleActionClick}
}

export default useSubmitEvent;