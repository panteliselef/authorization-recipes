const waitFor = (ms = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { waitFor };
