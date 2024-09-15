const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

export default formattedSeconds;
