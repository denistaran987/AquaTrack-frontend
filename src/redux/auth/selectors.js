export const selectAuth = state => state.auth;
export const selectUser = state => state.auth.name;
export const selectEmail = state => state.auth.email;
export const selectToken = state => state.auth.token;
export const selectAvatarUrl = state => state.auth.avatarUrl;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsLoading = state => state.auth.isLoading;
