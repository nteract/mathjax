module.exports = {
  timers: "fake",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  setupFilesAfterEnv: ["./test-setup.js"]
};
