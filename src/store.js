import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./redux/reducers/reducer";
import dataSlice from "./redux/reducers/dataReducer";

const store = configureStore({
  reducer: {
    theme: themeSlice,
    data:dataSlice,
  },
});

export default store;
