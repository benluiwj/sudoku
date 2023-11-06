# Sudoku

This Sudoku game was built using NextJS, Typescript, and Tailwind CSS. Games can be saved and loaded from a Supabase database as well (though you have to set this up on your own to test the functionality of it). The game is played on a 9x9 grid. The game aims to fill the grid with numbers from 1 to 9 such that each row, column, and 3x3 subgrid contains each number exactly once. The game is won when the grid is filled correctly.
Known issues:
- The library used sadly generates invalid games :(, so your solution may be correct. Still, because the errors are based on the solutions provided by the library, they may be highlighted as an error...

## Getting Started

First, install dependencies using `yarn` 

```
yarn install
```

Then, run the development server.

```
yarn dev
```


