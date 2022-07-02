let showQuadTree = true;
let circle = false;

let boids = [];
let quadtree;

let fps = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);

  for (let i = 0; i < 1000; i++) {
    boids.push(new Boid(
      random(width),
      random(height),
      // random(5, 15),
      5,
    ));
  }

  quadtree = new QuadTree(
    new Boundary(0, 0, width, height),
    4,
  );
}

function keyPressed() {
  switch (key) {
    case 'q':
      showQuadTree = !showQuadTree;
      break;
    case 'c':
      circle = !circle;
      break;
  }
}

function draw() {
  background(0);
  quadtree.rebuild(boids);
  quadtree.show(showQuadTree);

  // if (mouseIsPressed) {
  //   let range = new Boundary(mouseX - 100, mouseY - 100, 200, 200);

  //   if (circle) {
  //     range.circleMode = true;
  //   }

  //   let found = quadtree.query(range);

  //   if (!circle) {
  //     range.show();
  //   } else {
  //     found = found.filter((boid) => {
  //       return boid.position.dist(createVector(mouseX, mouseY)) < 100;
  //     });
  //     noFill();
  //     stroke(255);
  //     strokeWeight(1);
  //     ellipse(mouseX, mouseY, 200, 200);
  //   }

  //   for (let i = 0; i < found.length; i++) {
  //     // stroke(255);
  //     // strokeWeight(1);
  //     // line(mouseX, mouseY, found[i].position.x, found[i].position.y);

  //     let force = p5.Vector.sub(found[i].position, createVector(mouseX, mouseY));

  //     // force.setMag(min(5, 1/sqrt(force.mag())));

  //     found[i].applyForce(force);

  //     found[i].highlight();
  //   }

  // if (frameCount % 20 == 0) {
  //   fps += frameRate();
  //   fps /= 2;
  // }

  // // draw current fps under mouse, centered
  // textSize(48);
  // noStroke();
  // fill(255);
  // text(floor(fps), mouseX - textWidth(floor(fps)) / 2, mouseY + textAscent() / 2);
  // }

  let newBoids = [...boids];
  for (let i = 0; i < newBoids.length; i++) {
    let found = quadtree.query(boids[i].boundary);

    newBoids[i].flock(found);
    newBoids[i].run(found);
    newBoids[i].render();
  }

  boids = newBoids;
}
