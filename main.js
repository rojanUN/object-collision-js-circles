const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

class Particle {
  constructor() {
    this.x = Math.random() * (350 - 60) + 60;
    this.y = Math.random() * (350 - 60) + 60;
    this.radius = Math.random() * (60 - 40) + 40;
    this.xSpeed = randomizeSpeed();
    this.ySpeed = randomizeSpeed();
    this.color = "red";
  }

  render() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  checkBorderCollision() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.xSpeed *= -1;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.ySpeed *= -1;
    }
  }
}
const particle1 = new Particle();
const particle2 = new Particle();

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  const particle1X = particle1.x;
  const particle1Y = particle1.y;
  const particle2X = particle2.x;
  const particle2Y = particle2.y;
  particle1.render();
  particle2.render();
  particle1.move();
  particle2.move();
  particle1.checkBorderCollision();
  particle2.checkBorderCollision();

  drawLine(particle1X, particle1Y, particle2X, particle2Y);
  checkObjectCollision();

  requestAnimationFrame(animate);
}
animate();

function randomizeSpeed() {
  return Math.random() * (4 - 1) + 1;
}

function drawLine(x1, y1, x2, y2) {
  c.beginPath();
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.strokeStyle = "blue";
  c.lineWidth = 2;
  c.stroke();
}

function checkObjectCollision() {
  let dx = particle2.x - particle1.x;
  let dy = particle2.y - particle1.y;

  let distance = Math.floor(Math.sqrt(dx * dx + dy * dy));
  let sumOfRadii = Math.floor(particle1.radius + particle2.radius);
  if (distance < sumOfRadii) {
    particle1.color = "pink";
  }
}
