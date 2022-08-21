import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import App from './App';
import {createStore} from 'redux'
import { Provider } from 'react-redux';

const globalState={
    orgData:[],
}
const rootReducer=(state=globalState,action)=>{
    //return state;
  
    switch(action.type)
    {
            case 'UBAH_DATA' :
                alert(action.type)
                return{
                    ... state,                   //
                     orgData:action.newValue
                     //salary:action.newValue
 
                    
                }
                default :
                return state;
        
    } 
}
//    const storeRedux=createStore(rootReducer)
    const storeRedux=createStore(rootReducer)

ReactDOM.render(<Provider store={storeRedux}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
