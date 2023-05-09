import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

//only one saction creator in this project
export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {//Dispatch<Action> 
    //here ensuares TS knows that the payload in success case will 
    //have string[]
    dispatch({//this is how we manually dispatch actions
      type: ActionType.SEARCH_REPOSITORIES,
    });//indicates that we are about to start searching

    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      );
        //names is an array of strings
      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      dispatch({//this is how we manually dispatch actions
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({//this is how we manually dispatch actions
          type: ActionType.SEARCH_REPOSITORIES_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
