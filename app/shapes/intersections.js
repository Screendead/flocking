class Intersections {
  /**
   * @returns whether a point (`p5.Vector`) exists on a `Line`
   */
  static point_line(p, l) {
    let x1 = l.p1.x;
    let y1 = l.p1.y;
    let x2 = l.p2.x;
    let y2 = l.p2.y;
    let x3 = p.x;
    let y3 = p.y;
    let x4 = x3;
    let y4 = y3;
    let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) {
      return false;
    }
    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
    if (t > 0 && t < 1 && u > 0) {
      return true;
    }
    return false;
  }
}
