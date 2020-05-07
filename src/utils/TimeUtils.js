export const numberOfDaysRequired = (totalMinutes, hoursPerDay) => {
  let minutesPerHours = 60;
  return Math.floor(totalMinutes / (minutesPerHours * hoursPerDay));
};

export const minutesToDays = (minutes) => {
  let minutesPerHours = 60;
  let hoursPerDay = 24;
  return Math.floor(minutes / (minutesPerHours * hoursPerDay) );
};

export const toDaysHoursAndMinutes = (totalMinutes) => {
  let minutesPerHours = 60;
  let hoursPerDay = 24;
  let days = Math.floor(totalMinutes / (minutesPerHours * hoursPerDay));
  let hours = Math.floor((totalMinutes - (days * (minutesPerHours * hoursPerDay))) / minutesPerHours);
  let minutes = Math.round(totalMinutes % minutesPerHours);

  return {days, hours, minutes};
};
