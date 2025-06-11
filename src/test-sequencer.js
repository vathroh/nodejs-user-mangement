const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  /**
   * Sort test to determine order of execution
   * @param {Array<Test>} tests - list of test paths
   * @returns {Array<Test>} - sorted list of test paths
   */
  sort(tests) {
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

module.exports = CustomSequencer;
