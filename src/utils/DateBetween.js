let DateBetween = function(startDate, endDate) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let distance = endDate - startDate;

  let between = {};
  between.days = Math.floor(distance / day);
  between.hours = Math.floor((distance % day) / hour);
  between.minutes = Math.floor((distance % hour) / minute);
  between.seconds = Math.floor((distance % minute) / second);

  return distance > 0 ? between : 0;
}

module.exports = DateBetween;
