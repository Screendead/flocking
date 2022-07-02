class Boid {
  static ID = 0;

  boundary = null;

  constructor(x, y, mass) {
    this.id = Boid.ID++;

    this.mass = mass;
    this.size = sqrt(mass);
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    // this.velocity = createVector(0, 0);
    this.velocity.setMag(0.5);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 1;
    this.maxForce = 0.1;
    this.damping = 0.005 * mass;
    this.highlighted = false;

    this.updateBoundary();
  }

  highlight() {
    this.highlighted = true;
  }

  run() {
    this.update();
    this.borders();
  }

  updateBoundary() {
    this.boundary = new Boundary(
      this.position.x,
      this.position.y,
      20,
    );
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    let sep = this.separate(boids);
    let ali = this.align(boids);
    let coh = this.cohesion(boids);

    // sep.mult(1.5);
    // ali.mult(1.0);
    // coh.mult(1.0);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  separate(boids) {
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      let d = p5.Vector.dist(this.position, other.position);
      if (d > 0 && d < this.size * 2) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  align(boids) {
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      sum.add(other.velocity);
      count++;
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let sum = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      sum.add(other.position);
      count++;
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  borders() {
    if (this.position.x - this.size / 2 < -1) this.position.x = width - this.size / 2;
    if (this.position.y - this.size / 2 < -1) this.position.y = height - this.size / 2;
    if (this.position.x > width) this.position.x = this.size / 2;
    if (this.position.y > height) this.position.y = this.size / 2;
  }

  update() {
    this.velocity.add(this.acceleration);
    // this.velocity.mult(1 - this.damping);
    // this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  render() {
    // if (this.highlighted) {
    //   stroke(255, 255, 255);
    // } else {
      mag = this.velocity.mag() / this.maxSpeed * 255;
      stroke(255, 255 - mag * 4, 255 - mag);
    // }

    strokeWeight(this.mass);
    noFill();
    point(this.position.x, this.position.y);

    this.highlighted = false;
  }
}
