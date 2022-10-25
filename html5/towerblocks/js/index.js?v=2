const BACKGROUND_COLOR = "#D0CBC7";
const BLOCK_MOVE_AMOUNT = 12;
const BLOCK_STATES = { ACTIVE: "active", STOPPED: "stopped", MISSED: "missed" };
const CAMERA_VIEW_SIZE = 30;
const DEFAULT_COLOR_OFFSET = 50;
const GAME_STATES = {
  LOADING: "loading",
  PLAYING: "playing",
  READY: "ready",
  ENDED: "ended",
  RESETTING: "resetting"
};

console.clear();

class Stage {
  constructor() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false
    });
    this.renderer.setClearColor(BACKGROUND_COLOR, 1);
    document.getElementById("game").appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -100, 1000);
    this.camera.position.x = 2;
    this.camera.position.y = 2;
    this.camera.position.z = 2;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Light
    this.light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.light.position.set(0, 499, 0);
    this.scene.add(this.light);
    this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.softLight);

    // Resizing
    window.addEventListener("resize", this.onResize.bind(this));
    this.onResize();
  }

  slideCamera(y, speed = 0.3) {
    TweenLite.to(this.camera.position, speed, {
      y: y + 4,
      ease: Power1.easeInOut
    });
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.left = window.innerWidth / -CAMERA_VIEW_SIZE;
    this.camera.right = window.innerWidth / CAMERA_VIEW_SIZE;
    this.camera.top = window.innerHeight / CAMERA_VIEW_SIZE;
    this.camera.bottom = window.innerHeight / -CAMERA_VIEW_SIZE;
    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  add(elem) {
    this.scene.add(elem);
  }

  remove(elem) {
    this.scene.remove(elem);
  }
}

class Block {
  constructor(block) {
    // set size and position
    this.dimension = { width: 0, height: 0, depth: 0 };
    this.position = { x: 0, y: 0, z: 0 };
    this.targetBlock = block;
    this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
    this.workingPlane = this.index % 2 ? "x" : "z";
    this.workingDimension = this.index % 2 ? "width" : "depth";
    // set the dimensions from the target block, or defaults.
    this.dimension.width = this.targetBlock
      ? this.targetBlock.dimension.width
      : 10;
    this.dimension.height = this.targetBlock
      ? this.targetBlock.dimension.height
      : 2;
    this.dimension.depth = this.targetBlock
      ? this.targetBlock.dimension.depth
      : 10;
    this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
    this.position.y = this.dimension.height * this.index;
    this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
    this.colorOffset = this.targetBlock
      ? this.targetBlock.colorOffset
      : DEFAULT_COLOR_OFFSET;
    // set color
    if (!this.targetBlock) {
      this.color = 0x333344;
    } else {
      var offset = this.index + this.colorOffset;
      var r = Math.sin(0.3 * offset) * 55 + 200;
      var g = Math.sin(0.3 * offset + 2) * 55 + 200;
      var b = Math.sin(0.3 * offset + 4) * 55 + 200;
      this.color = new THREE.Color(r / 255, g / 255, b / 255);
    }
    // state
    this.state = this.index > 1 ? BLOCK_STATES.ACTIVE : BLOCK_STATES.STOPPED;
    // set direction
    this.speed = -0.1 - this.index * 0.005;
    if (this.speed < -4) this.speed = -4;
    this.direction = this.speed;
    // create block
    var geometry = new THREE.BoxBufferGeometry(
      this.dimension.width,
      this.dimension.height,
      this.dimension.depth
    );
    geometry.translate(
      this.dimension.width / 2,
      this.dimension.height / 2,
      this.dimension.depth / 2
    );
    this.material = new THREE.MeshToonMaterial({
      color: this.color,
      flatShading: true
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(
      this.position.x,
      this.position.y + (this.state == BLOCK_STATES.ACTIVE ? 0 : 0),
      this.position.z
    );
    if (this.state == BLOCK_STATES.ACTIVE) {
      this.position[this.workingPlane] =
        bento.getRandomFloat() > 0.5 ? -BLOCK_MOVE_AMOUNT : BLOCK_MOVE_AMOUNT;
    }
  }

  reverseDirection() {
    this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
  }

  place() {
    this.state = BLOCK_STATES.STOPPED;
    var overlap =
      this.targetBlock.dimension[this.workingDimension] -
      Math.abs(
        this.position[this.workingPlane] -
          this.targetBlock.position[this.workingPlane]
      );
    var blocksToReturn = {
      plane: this.workingPlane,
      direction: this.direction
    };
    if (this.dimension[this.workingDimension] - overlap < 0.3) {
      overlap = this.dimension[this.workingDimension];
      blocksToReturn.bonus = true;
      this.position.x = this.targetBlock.position.x;
      this.position.z = this.targetBlock.position.z;
      this.dimension.width = this.targetBlock.dimension.width;
      this.dimension.depth = this.targetBlock.dimension.depth;
    }
    if (overlap > 0) {
      var choppedDimensions = {
        width: this.dimension.width,
        height: this.dimension.height,
        depth: this.dimension.depth
      };
      choppedDimensions[this.workingDimension] -= overlap;
      this.dimension[this.workingDimension] = overlap;
      var placedGeometry = new THREE.BoxBufferGeometry(
        this.dimension.width,
        this.dimension.height,
        this.dimension.depth
      );
      placedGeometry.translate(
        this.dimension.width / 2,
        this.dimension.height / 2,
        this.dimension.depth / 2
      );
      var placedMesh = new THREE.Mesh(placedGeometry, this.material);
      var choppedGeometry = new THREE.BoxBufferGeometry(
        choppedDimensions.width,
        choppedDimensions.height,
        choppedDimensions.depth
      );
      choppedGeometry.translate(
        choppedDimensions.width / 2,
        choppedDimensions.height / 2,
        choppedDimensions.depth / 2
      );
      var choppedMesh = new THREE.Mesh(choppedGeometry, this.material);
      var choppedPosition = {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z
      };
      if (
        this.position[this.workingPlane] <
        this.targetBlock.position[this.workingPlane]
      ) {
        this.position[this.workingPlane] = this.targetBlock.position[
          this.workingPlane
        ];
      } else {
        choppedPosition[this.workingPlane] += overlap;
      }
      placedMesh.position.set(
        this.position.x,
        this.position.y,
        this.position.z
      );
      choppedMesh.position.set(
        choppedPosition.x,
        choppedPosition.y,
        choppedPosition.z
      );
      blocksToReturn.placed = placedMesh;
      if (!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
    } else {
      this.state = BLOCK_STATES.MISSED;
    }
    this.dimension[this.workingDimension] = overlap;
    return blocksToReturn;
  }

  tick() {
    if (this.state == BLOCK_STATES.ACTIVE) {
      var value = this.position[this.workingPlane];
      if (value > BLOCK_MOVE_AMOUNT || value < -BLOCK_MOVE_AMOUNT)
        this.reverseDirection();
      this.position[this.workingPlane] += this.direction;
      this.mesh.position[this.workingPlane] = this.position[this.workingPlane];
    }
  }
}

class Game {
  constructor() {
    this.blocks = [];
    this.highScore = 0;
    this.state = GAME_STATES.LOADING;
    this.stage = new Stage();
    this.mainContainer = document.getElementById("container");
    this.scoreContainer = document.getElementById("score");
    this.startButton = document.getElementById("start-button");
    this.instructions = document.getElementById("instructions");
    this.scoreContainer.innerHTML = "0";
    this.newBlocks = new THREE.Group();
    this.placedBlocks = new THREE.Group();
    this.choppedBlocks = new THREE.Group();
    this.stage.add(this.newBlocks);
    this.stage.add(this.placedBlocks);
    this.stage.add(this.choppedBlocks);
    this.addBlock();
    this.tick();
    this.updateState(GAME_STATES.READY);
    document.addEventListener("keydown", e => {
      if (e.keyCode !== 32) return;

      this.onAction();
    });

    let tapEvent;
    if (/Mobile/i.test(navigator.userAgent)) {
      tapEvent = "touchstart";
    } else {
      tapEvent = "mousedown";
    }

    document.addEventListener(tapEvent, e => {
      if (e.button) return;

      this.onAction();
    });

    // Sounds
    this.sounds = {
      hammer: new Howl({
        src: ["./audio/hammer.mp3"],
        volume: 0.15
      }),
      perfect: new Howl({
        src: ["./audio/perfect.mp3"],
        volume: 0.15
      }),
      gameover: new Howl({
        src: ["./audio/gameover.mp3"],
        volume: 0.15
      })
    };
  }

  updateState(newState) {
    for (var key in GAME_STATES)
      this.mainContainer.classList.remove(GAME_STATES[key]);
    this.mainContainer.classList.add(newState);
    this.state = newState;
  }

  onAction() {
    switch (this.state) {
      case GAME_STATES.READY:
        this.startGame();
        break;
      case GAME_STATES.PLAYING:
        this.placeBlock();
        break;
      case GAME_STATES.ENDED:
        this.restartGame();
        break;
    }
  }

  startGame() {
    if (this.state != GAME_STATES.PLAYING) {
      this.scoreContainer.innerHTML = "0";
      this.updateState(GAME_STATES.PLAYING);
      this.addBlock();
    }
  }

  restartGame() {
    var _this = this;
    this.updateState(GAME_STATES.RESETTING);
    var oldBlocks = this.placedBlocks.children;
    var removeSpeed = 0.2;
    var delayAmount = 0.02;
    var _loop_1 = function(i) {
      TweenLite.to(oldBlocks[i].scale, removeSpeed, {
        x: 0,
        y: 0,
        z: 0,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn,
        onComplete: function() {
          return _this.placedBlocks.remove(oldBlocks[i]);
        }
      });
      TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
        y: 0.5,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: Power1.easeIn
      });
    };
    for (var i = 0; i < oldBlocks.length; i++) {
      _loop_1(i);
    }
    var cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount;
    this.stage.slideCamera(2, cameraMoveSpeed);
    var countdown = { value: this.blocks.length - 1 };
    TweenLite.to(countdown, cameraMoveSpeed, {
      value: 0,
      onUpdate: function() {
        _this.scoreContainer.innerHTML = String(Math.round(countdown.value));
      }
    });
    this.blocks = this.blocks.slice(0, 1);
    setTimeout(function() {
      _this.startGame();
    }, cameraMoveSpeed * 1000);
  }

  placeBlock() {
    // Timeout 256ms
    if (this.lastPlaceBlock + 256 > Date.now()) return;
    this.lastPlaceBlock = Date.now();

    var _this = this;
    var currentBlock = this.blocks[this.blocks.length - 1];
    var newBlocks = currentBlock.place();
    this.newBlocks.remove(currentBlock.mesh);
    if (newBlocks.placed) this.placedBlocks.add(newBlocks.placed);
    if (newBlocks.chopped) {
      this.choppedBlocks.add(newBlocks.chopped);
      var positionParams = {
        y: "-=30",
        ease: Power1.easeIn,
        onComplete: function() {
          return _this.choppedBlocks.remove(newBlocks.chopped);
        }
      };
      var rotateRandomness = 10;
      var rotationParams = {
        delay: 0.05,
        x:
          newBlocks.plane == "z"
            ? bento.getRandomFloat() * rotateRandomness - rotateRandomness / 2
            : 0.1,
        z:
          newBlocks.plane == "x"
            ? bento.getRandomFloat() * rotateRandomness - rotateRandomness / 2
            : 0.1,
        y: bento.getRandomFloat() * 0.1
      };
      if (
        newBlocks.chopped.position[newBlocks.plane] >
        newBlocks.placed.position[newBlocks.plane]
      ) {
        positionParams[newBlocks.plane] =
          "+=" + 40 * Math.abs(newBlocks.direction);
      } else {
        positionParams[newBlocks.plane] =
          "-=" + 40 * Math.abs(newBlocks.direction);
      }
      TweenLite.to(newBlocks.chopped.position, 1, positionParams);
      TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
      this.sounds.hammer.play();
    }

    if (newBlocks.placed && !newBlocks.chopped) {
      this.sounds.perfect.play();
    }

    if (!newBlocks.placed) {
      this.sounds.gameover.play();
    }

    this.addBlock();
  }

  addBlock() {
    var lastBlock = this.blocks[this.blocks.length - 1];
    if (lastBlock && lastBlock.state == BLOCK_STATES.MISSED) {
      return this.endGame();
    }
    this.scoreContainer.innerHTML = String(this.blocks.length - 1);
    let newScore = this.blocks.length - 1;

    // Send highscores to Bento, along with a screenshot.
    if (this.highScore < newScore) {
      this.highScore = newScore;
      bento.sendScore(this.highScore);
    }

    var newKidOnTheBlock = new Block(lastBlock);
    this.newBlocks.add(newKidOnTheBlock.mesh);
    this.blocks.push(newKidOnTheBlock);
    this.stage.slideCamera(this.blocks.length * 2);
    if (this.blocks.length >= 5) this.instructions.classList.add("hide");
  }

  endGame() {
    this.updateState(GAME_STATES.ENDED);
  }

  tick() {
    var _this = this;
    this.blocks[this.blocks.length - 1].tick();
    this.stage.render();
    requestAnimationFrame(function() {
      _this.tick();
    });
  }
}

var game = new Game();
