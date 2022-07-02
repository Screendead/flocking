class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  show() {
    stroke(255);
    noFill();
    ellipse(this.center.x, this.center.y, this.radius * 2);
  }
}
