import css from "./title.module.css"

export const Title = () => (
  <h1 className={css["title"]}>
    A Game of Life
    <a
      className={css["link"]}
      aria-label="Learn more about Conway's Game of Life"
      href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'
      target='_blank'
      rel='noopener noreferrer'
    >
      *
    </a>
  </h1>
)
