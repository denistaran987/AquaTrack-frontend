import { createSelector } from '@reduxjs/toolkit';

export const selectUser = state => state.user;
export const selectWaterNorm = state => state.user.dailyNorm;
export const selectUserId = state => state.user._id;
export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserGender = state => state.user.gender;
export const selectUserDailyNorm = state => state.user.dailyNorm;
export const selectUserWeight = state => state.user.weight;
export const selectUserDailySportTime = state => state.user.dailySportTime;
export const selectUserAvatarUrl = state => state.user.avatarUrl;
export const selectUserIsLoading = state => state.user.isLoading;
export const selectUserError = state => state.user.error;

export const selectDailyNorm = createSelector(
  [selectUser],
  ({ weight, dailySportTime, gender }) => {
    if (!Number(weight) || !Number(dailySportTime) || !gender) return 1.5;
    return gender === 'female'
      ? (weight * 0.03 + dailySportTime * 0.4).toFixed(1)
      : (weight * 0.04 + dailySportTime * 0.6).toFixed(1);
  }
);
