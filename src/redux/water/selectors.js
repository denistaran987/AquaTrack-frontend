export const selectWaterCurrentDate = state => state.water.currentDate;
export const selectConsumedWaterData = state => state.water.consumedWaterData;
export const selectTodayProgress = state => state.water.todayProgress;
export const selectMonthWaterData = state => state.water.monthWaterData;
export const selectWaterId = state => state.water.waterId;
export const selectWaterItemInfo = (state, waterId) =>
  state.water.consumedWaterData.find(item => item._id === waterId);
