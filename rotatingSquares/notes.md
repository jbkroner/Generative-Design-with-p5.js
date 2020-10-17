# Rotating Squares

## Inspiration: 
This [tweet][1] by twitter user [@beesandbombs][2]:

(todo: embed the gif??)


## Description:
The original gif is of square canvas.  It contains two ~6*6 grids of squares, although only one is visible at any given moment.  The origin position for the squares is rotated 45 degrees of its axis.  The second grid of squares exists in the equally sized negative area between the original set.  Each square in this grid is covered by thick black stripes and thin white stripes.

The squares in the grid are rotating 360 degrees on a fixed interval (approximately 1 second).  When this happens a white border appears along each square.  After a set of squares completes a complete rotation the alternate set of squares, which occupy the negative space inbetween the original set, begin rotating.  This process repeats ad infitum.

## Planning:
The complimentary grids seem to be exactly the same (with respect to their visual appearance, grid spacing, and animations).  Because of this repition I think a simple OOP approach will work well here. 

I can break the problem into few simpler parts:
1. Draw a square, rotate it, and then draw a texture onto it. 

2. Draw a grid of squares.

The OOP part will probably look something like this: 

1. Declare class `Square`.  All the squares are the same, so the `Square` class will help us define that in one place.

1. Declare class `GridSquare`.  This utility class will represent one entire grid of `Square` instances.    

2. Create two instances of `GridSquare` with complimentary timing and positional values. 


[1]: https://twitter.com/beesandbombs/status/1284278207785689088

[2]: https://twitter.com/beesandbombs