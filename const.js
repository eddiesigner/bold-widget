export const styles = `
  .widget-root {
    position: fixed;
    z-index: 1000;
  }
  .widget-container * {
    box-sizing: border-box;
  }
  .widget-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 320px;
    position: absolute;
    right: -16px;
    bottom: 72px;
    max-height: calc(100vh - 180px);
    padding: 24px;
    border-radius: 8px;
    border: 1px solid var(--border);
    box-sizing: border-box;
    overflow: auto;
    color: var(--body);
    background-color: var(--background);
    box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
    transition: max-height .2s ease;
  }
  .widget-container.hidden {
    max-height: 0px;
  }
  .widget-button {
    appearance: none;
    width: 56px;
    height: 56px;
    position: relative;
    border-radius: 50%;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: var(--accent);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 8px 16px -2px;
    transition: opacity .2s linear;
  }
  .widget-button:hover {
    opacity: 0.9;
  }
  .widget-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -16px;
    margin-left: -16px;
    cursor: pointer;
    color: var(--text-on-accent);
    transition: transform .3s ease;
  }
  .widget-hidden {
    transform: scale(0);
  }
  .widget-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .widget-header h3 {
    text-transform: uppercase;
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0;
  }
  .widget-header p {
    line-height: 1.4;
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0;
    opacity: 0.8;
  }
  .widget-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .widget-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .widget-field.color {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .widget-field label {
    font-size: 0.9375rem;
    font-weight: 500;
  }
  .widget-field input,
  .widget-field select {
    color: var(--body);
    font-size: 0.9375rem;
    padding: 4px 8px;
    border: 1px solid var(--border);
    background-color: var(--background);
  }
  .widget-field input[type="color"] {
    width: 32px;
    height: 32px;
    appearance: none;
    padding: 0;
    border: none;
    background: none;
  }
  .widget-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .bo-button.small.reset {
    color: var(--accent);
    font-weight: normal;
    background-color: transparent;
    border: 1px solid var(--accent);
  }
  .homepage-field,
  .post-field {
    display: none;
  }
  .home-template .homepage-field {
    display: flex;
  }
  .post-template .post-field {
    display: flex;
  }
  @media only screen and (max-width: 568px) {
    .widget-root {
      bottom: 16px !important;
      right: 16px !important;
    }
    .widget-container {
      width: 280px;
      max-height: calc(100vh - 240px);
      right: 0;
    }
  }
`

export const showcaseStyles = `
  .bo-posts-container {
    padding-top: 2px;
  }
  .bo-posts-container__wrapper {
    gap: 2px;
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
  }
`

export const WIDGET_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
`

export const CLOSE_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
`
