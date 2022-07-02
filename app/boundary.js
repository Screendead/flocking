class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h ?? w;

    this.highlighted = false;
    this.circleMode = false;
  }

  highlight() {
    this.highlighted = true;
  }

  // Check if the boundary is hit
  check(object) {
    // Check if the object is out of bounds
    if (object.x < this.x || object.x + object.w > this.x + this.w) {
      object.velX = -object.velX;
    }
    if (object.y < this.y || object.y + object.h > this.y + this.h) {
      object.velY = -object.velY;
    }
  }

  // Check if the boundary contains a point
  contains(point) {
    return (point.x > this.x && point.x < this.x + this.w && point.y > this.y && point.y < this.y + this.h);
  }

  // Check if the boundary intersects another boundary
  intersects(range) {
    if (!range.circleMode && !this.circleMode) {
      return (this.x < range.x + range.w && this.x + this.w > range.x && this.y < range.y + range.h && this.y + this.h > range.y);
    } else if (this.circleMode && range.circleMode) {
      return (dist(this.x, this.y, range.x, range.y) < this.w / 2 + range.w / 2);
    } else if (this.circleMode) {
      return range.circleIntersectsWithRect(this);
    } else if (range.circleMode) {
      return this.circleIntersectsWithRect(range);
    }
  }

  // Check if the boundary intersects a circle
  circleIntersectsWithRect(circle) {
    if (this.contains(circle.center())) {
      return true;
    }


  }

  lineIntersectsWithCircle(line, circle) {

  }

  // Show the boundary
  show() {
    stroke(255);
    strokeWeight(1);

    if (this.highlighted) {
      fill(255, 0, 0, 100);
    } else {
      noFill();
    }

    rect(this.x, this.y, this.w, this.h);
  }

  // Get the center of the boundary
  center() {
    return createVector(this.x + this.w / 2, this.y + this.h / 2);
  }

  // Get the corners of the boundary
  getCorners() {
    return [
      createVector(this.x, this.y),
      createVector(this.x + this.w, this.y),
      createVector(this.x, this.y + this.h),
      createVector(this.x + this.w, this.y + this.h),
    ];
  }
}
