import { busyHours } from './data';

export const calculateHours = (workload, deadline, hoursPerDay) => {
  const totalWorkload = parseInt(workload);
  const workDays = getWorkDays(deadline);
  const availableHoursPerDay = parseInt(hoursPerDay);
  const totalAvailableHours = calculateTotalAvailableHours(workDays, availableHoursPerDay);
  const totalBusyHours = calculateTotalBusyHours();

  if (totalWorkload > totalAvailableHours) {
    return [];
  }

  const remainingHours = totalWorkload - totalBusyHours;
  const hoursPerDayArray = distributeHoursPerDay(remainingHours, workDays);

  const result = workDays.map((day, index) => ({
    date: day,
    hours: hoursPerDayArray[index]
  }));

  return result;
};

const getWorkDays = (deadline) => {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const workDays = [];

  while (currentDate <= deadlineDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      workDays.push(currentDate.toISOString().split('T')[0]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workDays;
};

const calculateTotalAvailableHours = (workDays, availableHoursPerDay) => {
  return workDays.length * availableHoursPerDay;
};

const calculateTotalBusyHours = () => {
  return busyHours.reduce((total, entry) => total + entry.busyHours, 0);
};

const distributeHoursPerDay = (remainingHours, workDays) => {
  const totalWorkDays = workDays.length;
  const hoursPerDay = Math.floor(remainingHours / totalWorkDays);
  const remainingHoursMod = remainingHours % totalWorkDays;
  const hoursPerDayArray = Array(totalWorkDays).fill(hoursPerDay);

 
  for (let i = 0; i < remainingHoursMod; i++) {
    hoursPerDayArray[i] += 1;
  }

  return hoursPerDayArray;
};
