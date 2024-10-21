import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import storage from "redux-persist/es/storage/session";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"],
// };

// const rootReducer = combineReducers({
//   loading: stepSlice,
// });
// export type RootState = ReturnType<typeof rootReducer>;
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   devTools: true,
// });

// export const persistor = persistStore(store);
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export default store;
