/**
 * Helper methods for Bento games!
 * Version 0.0.7
 */
const bento = {
  /**
   * Sends score to Bento. Most games will use this method.
   * @param {number} score
   * @param {any} scoreMetadata
   */
  sendScore: (score, scoreMetadata = {}) => {
    parent.postMessage(JSON.stringify({ score, scoreMetadata }), "*");
  },

  /**
   * Gets a seeded random integer, up to a max (exclusive).
   * @param {number} max
   * @returns {number}
   */
  getRandomInt: (max = 2) => {
    return Math.floor(bento.getRandomFloat(max));
  },

  /**
   * Prepares a Phaser game for Bento.
   * Call this in the `init` fn, otherwise the `stage.disableVisibilityChange`
   * setting might not take effect in time, and the game will just be paused.
   * @param {Phaser.Game} game
   */
  preparePhaserGame: game => {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;
  },

  /**
   * Sends score delta to Bento. Only some games use delta scoring.
   * @param {number} delta
   */
  sendScoreDelta: delta => {
    parent.postMessage(JSON.stringify({ delta }), "*");
  },

  /**
   * Gets value of given parameter from URL.
   * @param {string} param
   */
  getUrlParameter: param => {
    param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

  /**
   * Takes screenshot of Phaser game.
   * @param {Phaser.Game} game
   */
  screenshotPhaserGame: game => {
    return game.canvas.toDataURL("image/png");
  },

  /** Chooses a random list item. */
  getRandomChoice: list => {
    return list[(list.length * bento.getRandomFloat()) | 0];
  },

  /** Gets a seeded random float, up to a max (exclusive). */
  getRandomFloat: (max = 1) => {
    bento.rngCounter += 1;

    const today = new Date();
    const gameEndTimestamp = bento.getUrlParameter("gameEndTimestamp");
    const seed = gameEndTimestamp
      ? `seed:${gameEndTimestamp}`
      : today.getMonth() + 1 + "/" + today.getDate();
    let randomFloat;
    try {
      randomFloat = new Math.seedrandom(seed + "/" + bento.rngCounter)();
    } catch (err) {
      console.log(
        "Warning: The seedrandom library is missing, " +
          "so random numbers will not be consistent across clients."
      );
      randomFloat = Math.random();
    }
    return randomFloat * max;
  },

  /**
   * Gets a seeded random integer, up to a max (exclusive).
   * @param {number} max
   * @param {string} seed
   * @returns {number}
   */
  getRandomIntSeeded: (max = 1, seed = "") => {
    return Math.floor(bento.getRandomFloatSeeded(max, seed));
  },

  /** Gets a seeded random float, up to a max (exclusive). */
  getRandomFloatSeeded: (max = 1, seed = "") => {
    let randomFloat;
    try {
      randomFloat = new Math.seedrandom(seed)();
    } catch (err) {
      console.log(
        "Warning: The seedrandom library is missing, " +
          "so random numbers will not be consistent across clients."
      );
      randomFloat = Math.random();
    }
    return randomFloat * max;
  },

  /** Used to generate consistent random numbers across clients. */
  rngCounter: 0
};

if (typeof module === "object") {
  module.exports = bento;
}
