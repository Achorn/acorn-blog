const useAutoSave = () => {
  let timer = null;

  const delaySaveToDatabase = () => {
    console.log(timer);
    if (timer) {
      console.log("clearing timeout");
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log("delayed save!!!!");
    }, 3000);
  };
  return { delaySaveToDatabase };
};

export default useAutoSave;
