class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    this.x /= n;
    this.y /= n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    let m = this.mag();
    if (m > 0) {
      this.div(m);
    }
  }

  limit(max) {
    if (this.mag() > max) {
      this.normalize();
      this.mult(max);
    }
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  static mult(v, n) {
    return new Vector(v.x * n, v.y * n);
  }

  static div(v, n) {
    return new Vector(v.x / n, v.y / n);
  }

  static mag(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  static normalize(v) {
    let mag = Vector.mag(v);
    return Vector.div(v, mag);
  }

  static limit(v, max) {
    if (v.mag() > max) {
      v.normalize();
      v.mult(max);
    }
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static angleBetween(v1, v2) {
    return Math.acos(Vector.dot(v1, v2) / (Vector.mag(v1) * Vector.mag(v2)));
  }

  static angleBetweenDeg(v1, v2) {
    return Vector.angleBetween(v1, v2) * 180 / Math.PI;
  }
}
