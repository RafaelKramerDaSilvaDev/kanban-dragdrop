import { createGlobalStyle, css } from 'styled-components'

const reset = css`
  :root {
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  *,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body,
  button,
  select,
  input {
    font-family: 'Inter', sans-serif !important;
  }

  input,
  button {
    outline: 0;
    border: 0;
  }

  button {
    cursor: pointer;
  }
`

export const GlobalStyles = createGlobalStyle`
  ${reset};
`
