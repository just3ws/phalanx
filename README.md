# Phalanx

Arm yourself for battle with spades and clubs and shields against your
opponent.

Phalanx is a head-to-head combat card game for two or more players utilizing a
standard card deck.

## Card Deck

**TL;DR**

> Create a Starter Deck using only the Number Cards (2-10) from a standard
> 52-card deck.

Phalanx is designed to be played using a standard 52-card deck.

The Numbered Cards are enough to get started and even those aren't all
required. In play testing a subset containing bigger attackers with weaker
defenders led to a fast-paced deck with bigger hits and cards cycling through
the battlefield at a rapid click.

We'll go through advanced decks later and using the Face Cards, Ace, and Joker.

## Cards

Some basics about cards.

### Suites

**TL;DR**

> ♦ Diamonds shield cards
> ╰─── blocks twice if in front of a card
>
> ♥ Hearts shield player
> ╰─── blocks twice if in front of a player
>
> ♣ Clubs attack cards
> ╰─── doubles damage dealt to backrow cards
>
> ♠ Spades attack players
> ╰─── doubles damage dealt to player

Suites are the little symbols you see on each card. The odds are if you're
reading this in English then you'll likely be familiar with red Diamonds and
Hearts with black Spades and Clubs. If not then no worries we'll be explaining
what they are and how they're used.

Phalanx play is based on the four standard suites and each has a bonus that
affects play.

```
          ▓▓▓▓██                  ░░▒▒██
      ████▒▒▒▒▒▒████          ██▓▓▒▒▒▒▒▒▓▓██
    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██      ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
  ██▒▒▒▒▒▒░░░░▒▒▒▒▒▒▓▓▓▓  ▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓██
  ██▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
██▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
██▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
██▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
██▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
  ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
  ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
    ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
      ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
        ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓
          ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓░░
            ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
            ░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓░░
                ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
                  ██▒▒▒▒▒▒▒▒▒▒██
                  ░░██▒▒▒▒▒▒██░░
                      ██▒▒██
                        ██
```

```

                      ██████
                  ▓▓▓▓▓▓▓▓▓▓▓▓██
                ██▓▓▓▓░░▓▓▓▓▓▓▓▓██
                ██▓▓▒▒░░▓▓▓▓▓▓▓▓██
              ██▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
              ██▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
              ██▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒██
                ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
                ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
                  ██▓▓▓▓▓▓▓▓▓▓██
        ██████      ██▓▓▓▓▓▓██      ██████
    ████▓▓▓▓▓▓████    ██▓▓██    ████▓▓▓▓▓▓████
  ▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓  ██▓▓██  ▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓██
  ██▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓██▓▓▓▓▓▓██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓██
██▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓██  ██▓▓██  ██▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
    ████▓▓▓▓▓▓████    ██▓▓██    ████▓▓▓▓▓▓████
        ██████        ██▓▓██        ██████
                      ██▓▓██
                    ██▓▓▓▓▓▓██
                ████▓▓▓▓▓▓▓▓▓▓▓▓██
            ██████████████████████████

```

```
                        ██
                      ██▓▓██
                    ██▓▓▓▓▓▓██
                  ██▓▓▓▓▓▓▓▓▓▓██
                ██▓▓▓▓░░▓▓▓▓▓▓▓▓██
              ██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓██
            ██▓▓▓▓░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
          ██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
        ▓▓▓▓▓▓░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
      ██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
    ██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ▓▓▓▓▓▓░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
  ██▓▓▓▓▓▓▓▓▒▒▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
    ██▓▓▓▓▓▓▓▓▓▓▒▒▓▓████▓▓████▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
      ██▓▓▒▒▓▓▒▒████  ██▓▓██  ████▓▓▓▓▓▓▓▓██
        ████████      ██▓▓██      ████████
        ░░░░░░░░    ▓▓▓▓▓▓▓▓██    ░░░░░░░░
                ████▓▓▓▓▓▓▓▓▓▓████
            ██████████████████████████

```

```
                      ██
                      ██
                    ██▒▒██
                    ██▒▒██
                  ██▒▒▒▒▒▒██
                  ██▒▒▒▒▒▒██
                ▓▓▒▒░░▒▒▒▒▓▓▓▓
              ██▒▒░░▒▒▒▒▒▒▒▒▒▒██
            ▒▒▓▓░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓██
          ██▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓
        ██▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
    ████▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████
██▓▓▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓
    ████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████
        ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
          ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
            ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
            ░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒██░░
                ██▒▒▒▒▒▒▒▒▒▒██
                  ██▒▒▒▒▒▒██
                  ██▒▒▒▒▒▒██
                    ██▒▒██
                    ██▒▒██
                      ██
                      ██

```

```
╭───╮
│ ♠ │
│ A │
╰───╯
```

```
╭───╮ ╭───╮ ╭───╮ ╭───╮ ╭───╮ ╭───╮ ╭───╮ ╭───╮ ╭───╮
│ ♦ │ │ ♥ │ │ ♣ │ │ ♠ │ │ ♦ │ │ ♥ │ │ ♠ │ │ ♦ │ │ ♥ │
│ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 │ │ 7 │ │ 8 │ │ 9 │ │ T │
╰───╯ ╰───╯ ╰───╯ ╰───╯ ╰───╯ ╰───╯ ╰───╯ ╰───╯ ╰───╯
```

```
╭───╮
│ ♣ │
│ J │
╰───╯
```

```
╭───╮
│ ♠ │
│ Q │
╰───╯
```

```
╭───╮
│ ♦ │
│ K │
╰───╯
```

```
╭───╮
│   │
│ ★ │
╰───╯
```

```
╭───╮
│   │
│   │
╰───╯
```

```
╭───╮ ╭───╮ ╭───╮ ╭───╮
│ ♠ │ │ ♦ │ │ ♥ │ │ ♣ │
│ A │ │ 2 │ │ 3 │ │ 4 │
╰───╯ ╰───╯ ╰───╯ ╰───╯
╭───╮ ╭───╮ ╭───╮ ╭───╮
│ ♠ │ │ ♦ │ │ ♥ │ │ ♠ │
│ 5 │ │ 6 │ │ 7 │ │ 8 │
╰───╯ ╰───╯ ╰───╯ ╰───╯
═══════════════════════
╭───╮ ╭───╮ ╭───╮ ╭───╮
│ ♦ │ │ ♥ │ │ ♣ │ │ ♠ │
│ 9 │ │ T │ │ J │ │ Q │
╰───╯ ╰───╯ ╰───╯ ╰───╯
╭───╮ ╭───╮
│ ♦ │ │   │
│ K │ │ ★ │
╰───╯ ╰───╯
```
