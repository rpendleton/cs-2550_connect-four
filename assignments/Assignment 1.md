# Assignment 1

### Questions

I have a few questions about what tools I am allowed to use in my assignments
and projects. I'd understand if I can't use the tools below, but I figure
they're used commonly in real-world/professional development, so I would prefer
if I could continue using them. They make development a lot easier, and let me
focus on the actual problem.

1. I originally started out trying to avoid SASS, since I wasn't sure if I
would be allowed to use it. However, I kept finding myself in situations where
having it would make things a lot cleaner, so I finally gave in and switched to
it. Is this okay as long as I include a compiled stylesheet? Although I'm mostly
using it for nested selector rules, which I could go without, there are a few
places where I use `@for` loops to generate some tedious animations. After SASS
compiles this, (and I put it through auto-prefixer, which I talk about in my
next question), it turns into 162 lines of somewhat compact CSS, which I'd
prefer not writing by hand.

  ```scss
  #connect-four {
    @for $i from 1 through 6 {
      tr:nth-child(#{$i}) td[data-player]:before {
        animation: drop-in-#{$i} 0.5s;
      }
    }
  }

  @for $i from 1 through 6 {
    @keyframes drop-in-#{$i} {
      0% {
        transform: translateY(#{$i * $grid-cell-size * -1});
      }

      50% {
        transform: translateY(2px);
      }

      75% {
        transform: translateY(-3px);
      }
    }
  }
  ```

2. I'm also using auto-prefixer on the resulting CSS files, which automatically
adds vendor prefixes to CSS properties, based on supported browser requirements
I set. So in the example above, I only defined `animation`, but auto-prefixer
will add `-webkit-animation` later on when I build my project with gulp, since
Chrome and Safari still require it. This lets me focus more on my actual
stylesheet, rather than forcing me to spend time figuring out why my code works
in some browsers, but not others.

### Repository

My assignment is being served on GitHub pages: [ryanp-me/cs-2550][1].  
The repository for my code is also on GitHub: [ryanp-me/cs-2550][2].

If desired/needed, I can apply tags for each assignment, so you know what I'm
submitting for each one. I don't want to get ahead in class, and confuse you
about what you're looking at.

[1]: http://ryanp-me.github.io/cs-2550/ "GitHub Pages"
[2]: https://github.com/ryanp-me/cs-2550/tree/master/connect-four/app "GitHub Repository"

### Grading Criteria

Points | Requirement                                    | Notes
-------|------------------------------------------------|-------
15     | Game description page (index.html)             | [Yes][1]
5      | External Link                                  | [Yes (To Wikipedia)][1]
5      | Image                                          | [Yes (From Wikipedia)][1]
10     | Separate window                                | [Yes (Play Game)][1]
15     | Game grid page with an HTML table for the grid | [Yes][3]
20     | Preliminary software design                    | [Yes][4]
10     | External style sheet                           | [Yes][5]
10     | Styles in game description                     | [Yes][6]
10     | Styles in game grid                            | [Yes][7]

[3]: http://ryanp-me.github.io/cs-2550/game.html "game page"
[4]: http://ryanp-me.github.io/cs-2550/design.html "design page"
[5]: https://github.com/ryanp-me/cs-2550/tree/b4dde4394ef1885947ff76c4f8482d3aa193344c/connect-four/app/style.scss "stylesheet"
[6]: https://github.com/ryanp-me/cs-2550/tree/b4dde4394ef1885947ff76c4f8482d3aa193344c/connect-four/app/index.html "styles in description"
[7]: https://github.com/ryanp-me/cs-2550/tree/b4dde4394ef1885947ff76c4f8482d3aa193344c/connect-four/app/game.html "styles in game grid"
