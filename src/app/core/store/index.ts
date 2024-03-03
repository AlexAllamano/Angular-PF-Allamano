import { featureName as authFeaturename, authReducer } from "./auth/reducers";

export const appReducers = {
    [authFeaturename]: authReducer
}