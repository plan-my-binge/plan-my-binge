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


export const mode = numbers => {
  let modes = [], count = [], i, number, maxIndex = 0;

  for (i = 0; i < numbers.length; i += 1) {
    number = numbers[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes[0];
};