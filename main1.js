// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;

}
function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}
Ball.prototype = Object.create(Shape.prototype);
Object.defineProperty(Ball.prototype, 'constructor', {
    value: Ball,
    enumerable: false,
    writable: true
});

function EvilCyrcle(x, y, size) {
    Ball.call(this, x, y, 20, 20, true, 'white', size);

}

EvilCyrcle.prototype = Object.create(Ball.prototype);
Object.defineProperty(EvilCyrcle.prototype, 'constructor', {
    value: EvilCyrcle,
    enumerable: false,
    writable: true
});

EvilCyrcle.prototype.draw = function () {
    ctx.beginPath();
    lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();

};

EvilCyrcle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    } if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }
    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }
    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }
    // this.velX += this.x;
    // this.velY += this.y;

};
EvilCyrcle.prototype.setControls = function () {
    //     let _this = this;
    //     window.onkeydown = function (e) {
    //         if (e.key === 'a') {
    //             _this.x -= _this.velX;
    //         }
    //         if (e.key === 'd') {
    //             _this.x += _this.velX;
    //         }
    //         if (e.key === 'w') {
    //             _this.y -= _this.velY;
    //         }
    //         if (e.key === 's') {
    //             _this.y += _this.velY;
    //         }
    //     };
    // };

    let _this = this;
    window.onkeydown = function (e) {
        if (e.key === 'a') {
            _this.x -= _this.velX;
        } else if (e.key === 'd') {
            _this.x += _this.velX;
        } else if (e.key === 'w') {
            _this.y -= _this.velY;
        } else if (e.key === 's') {
            _this.y += _this.velY;
        }
    };
};





// let cyrcle = new EvilCyrcle(random(0, width), random(0, height));
// cyrcle.draw();
// console.log(cyrcle.draw());

// function Ball(x, y, velX, velY, color, size) {
//     this.x = x;
//     this.y = y;
//     this.velX = velX;
//     this.velY = velY;
//     this.color = color;
//     this.size = size;
//}
Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};
Ball.prototype.update = function () {

    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    } if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
};
let balls = [];
while (balls.length < 200) {
    let size = random(10, 50);
    let ball = new Ball(random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        'rgb( ' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size


    ); balls.push(ball);
    console.log(balls);

}
let visibleBall = new Ball(20, 59, 5, 9, true, 'rgb(254, 23, 167), 60)', 88);
visibleBall.draw();
Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';

            }
        }
    }
};
EvilCyrcle.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j] !== this) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;


                // } if (balls[j].exists === false) {
                //     balls[j].size = 0;
                //     ballsNumber -= 1;
                //     // console.log(ballsNumber);
                // }
            }
        }
    }
};

function loop() {
    let ballsNumber = balls.length;
    let count = document.querySelector('p');
    ctx.fillStyle = 'rgb(0,0,0,0.15)';
    ctx.fillRect(0, 0, width, height);


    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists === false) {
            balls[i].size = 0;
            ballsNumber -= 1;
            count.textContent = 'Balls: ' + ballsNumber;

            // console.log(ballsNumber);
        }
        // } else { balls[i].size = random(10, 20); }
        if (balls[i].exists === true) {
            balls[i].draw();
        }
        balls[i].update();
        balls[i].collisionDetect();
        evilCyrcle.setControls();
        // balls.push(evilCyrcle);
        evilCyrcle.draw();
        evilCyrcle.collisionDetect();
        evilCyrcle.checkBounds();

    }
    // switch (ballsNumber) {
    //     case 0: alert('Good job!');
    //         break;
    // }
    if (ballsNumber === 0) {
        swal({
            title: "Brawo!",
            button: "Ok",
        });
        for (let value of balls) {
            value.exists = true;
            value.size = random(10, 20);
            console.log(balls);
        }
    }

    requestAnimationFrame(loop);

}

let size = 50;
let evilCyrcle = new EvilCyrcle(random(0 + size, width - size),
    random(0 + size, height - size), size);
loop();

