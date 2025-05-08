## Snake Game
It's a snake game but with puzzle

## Introduction:

Hi, this is a puzzle snake game, where you have to find the solution to the puzzles given for you
Each level will bring new challenges
In this moment the game doesn't have any way of choosing the difficult
But for some later improvement it for sure be implemented

## Why to create a game like this?

The first idea was very simple, recreate the popular snake game
I did that (Most parts of the code are gone by now)
It was very cool, but in the of remaking it, I thought why I don't add new types of blocks
So in the remaking of the game I was also creating new blocks, like sand and water
And in the old version it would add random blocks everywhere (I was able to add the quantity I wanted of each block)
But it was very empty, just get the apples and so on, so the puzzle game stick to me
So that's why I'm making this game

## Blocks: (5 types) (immovable)

Grass (g) (Does nothing)
Wall (b) (Kills you)
Water (w) (Kills you)
Sand (s) (Make you slower when you are inside of it)
Finish (f) (For completing the level)

## PowerUps: (3 types) (immovable)

Apple (a) (Makes you bigger)
Speed-Boost (f, r) (Makes you permanently faster or slower)
Star (s) (Makes you invincible)
Teleport (t) (Will teleport you to another teleport)

## Exception: (Don't include in any category)

Snake's body parts (movable)

## How does the map work?

The map has two values for each block
The first is the PowerUp letter type
And the second is the block letter type

(n stands for nothing, just applies to PowerUp)

Examples:

ng - no PowerUp and a grass block
as - apple PowerUp and a sand block