class Rectangle {
  static fromWidthHeight(topLeft, width, height) {
    let topRight = createVector(topLeft.x + width, topLeft.y);
    let bottomLeft = createVector(topLeft.x, topLeft.y + height);
    let bottomRight = createVector(topRight.x, bottomLeft.y);

    return new Rectangle(topLeft, topRight, bottomLeft, bottomRight);
  }

  constructor(topLeft, topRight, bottomLeft, bottomRight) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;

    this.width = topRight.x - topLeft.x;
    this.height = bottomLeft.y - topLeft.y;
  }
}
