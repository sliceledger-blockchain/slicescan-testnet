import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalBlock: '',
   gasPrice : '',
   totalAccount:'',
   latestBlock :[],
   allBlock : [],
   totaltransactions:"",
};

export const dataSlice = createSlice({
    name: "data",
    initialState,

    reducers: {
       
        setTotalBlock(state,action){
            state.totalBlock = action.payload;
        },
        setGasPrice(state,action) {
             state.gasPrice = action.payload;
        },
        setTotalAccount(state,action){
            state.totalAccount = action.payload;
        },
        setTotalTransactions(state, action){
            state.totaltransactions = action.payload;
        },
        setLatestBlock(state=[],action){
            state.latestBlock.push(action.payload);
        },
        setAllBlock(state=[],action){
            state.allBlock.push(action.payload);
        },
       
        


        
    
    },

})



export const { setTotalBlock,setGasPrice,setTotalAccount,setLatestBlock, setTotalTransactions,setAllBlock} = dataSlice.actions;

export default dataSlice.reducer;