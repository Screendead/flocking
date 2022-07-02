
let Intersections = require('./intersections');
let Rectangle = require('./rectangle');
let Line = require('./line');
let Circle = require('./circle');
let Vector = require('./vector');


describe('Intersections', () => {
  describe('point_line', () => {
    it('should return true if the point is on the line', () => {
      let p = new Vector(0.5, 0.5);
      let l = new Line(new Vector(0, 0), new Vector(1, 1));
      expect(Intersections.point_line(p, l)).toBe(true);
    });

    it('should return false if the point is not on the line', () => {
      let p = new Vector(0.5, 0.5);
      let l = new Line(new Vector(0, 0), new Vector(1, 0));
      expect(Intersections.point_line(p, l)).toBe(false);
    });
  });
});
