class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.boids = [];
    this.divided = false;
  }

  insert(boid) {
    if (!this.boundary.contains(boid.position)) {
      return false;
    }

    if (this.boids.length < this.capacity) {
      this.boids.push(boid);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    if (this.northWest.insert(boid)) {
      return true;
    } else if (this.northEast.insert(boid)) {
      return true;
    } else if (this.southWest.insert(boid)) {
      return true;
    } else if (this.southEast.insert(boid)) {
      return true;
    }

    return false;
  }

  subdivide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.w / 2;
    const h = this.boundary.h / 2;

    this.northWest = new QuadTree(new Boundary(x, y, w, h), this.capacity);
    this.northEast = new QuadTree(new Boundary(x + w, y, w, h), this.capacity);
    this.southWest = new QuadTree(new Boundary(x, y + h, w, h), this.capacity);
    this.southEast = new QuadTree(new Boundary(x + w, y + h, w, h), this.capacity);

    this.divided = true;
  }

  query(range) {
    let found = [];

    if (!this.boundary.intersects(range)) {
      return found;
    }


    for (let i = 0; i < this.boids.length; i++) {
      if (range.contains(this.boids[i].position)) {
        found.push(this.boids[i]);
      }
    }

    if (this.divided) {
      found = found.concat([
        ...this.northWest.query(range),
        ...this.northEast.query(range),
        ...this.southWest.query(range),
        ...this.southEast.query(range),
      ]);
    }

    // this.boundary.highlight();

    return found;
  }

  clear() {
    this.boids = [];
    this.divided = false;

    this.northWest?.clear();
    this.northEast?.clear();
    this.southWest?.clear();
    this.southEast?.clear();

    this.northWest = null;
    this.northEast = null;
    this.southWest = null;
    this.southEast = null;
  }

  rebuild(boids) {
    this.clear();
    for (let i = 0; i < boids.length; i++) {
      this.insert(boids[i]);
    }
  }

  show(showAll) {
    if (showAll || this.boundary.highlighted) {
      this.boundary.show();
    }

    if (this.divided) {
      this.northWest.show(showAll);
      this.northEast.show(showAll);
      this.southWest.show(showAll);
      this.southEast.show(showAll);
    }
  }
}
