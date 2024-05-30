import { styles, WIDGET_ICON, CLOSE_ICON } from './const.js'

class ThemeWidget {
  constructor(position = 'bottom-right') {
    this.position = this.getPosition(position)
    this.open = false
    this.initialize()
    this.injectStyles('widget-styles', styles)
  }

  position = ''
  open = false
  widgetContainer = null
  widgetResetButton = null
  accentColorControl = null
  titleFontControl = null
  bodyFontControl = null
  heroLayoutControl = null
  heroForegroundColorControl = null
  heroBackgroundColorControl = null
  heroTitleControl = null
  heroImageControl = null
  originalHeroTitleContent = ''
  heroTaglineControl = null
  originalHeroTaglineContent = ''
  navigationBarStyleControl = null
  footnoteTextControl = null
  originalFootnoteContent = ''
  postCardLayoutControl = null
  postHeaderLayoutControl = null

  getPosition(position) {
    const [vertical, horizontal] = position.split('-')
    return {
      [vertical]: '32px',
      [horizontal]: '32px',
    }
  }

  initialize() {
    const container = document.createElement('div')
    container.classList.add('widget-root')
    Object.keys(this.position).forEach((key) => {
      container.style[key] = this.position[key]
    })
    document.body.appendChild(container)

    const buttonContainer = document.createElement('button')
    buttonContainer.setAttribute('aria-label', 'Toggle theme options')
    buttonContainer.classList.add('widget-button')

    const widgetIconElement = document.createElement('span')
    widgetIconElement.innerHTML = WIDGET_ICON
    widgetIconElement.classList.add('widget-icon')
    this.widgetIcon = widgetIconElement

    const closeIconElement = document.createElement('span')
    closeIconElement.innerHTML = CLOSE_ICON
    closeIconElement.classList.add('widget-icon', 'widget-hidden')
    this.closeIcon = closeIconElement

    buttonContainer.appendChild(this.widgetIcon)
    buttonContainer.appendChild(this.closeIcon)
    buttonContainer.addEventListener('click', this.toggleOpen.bind(this))

    this.widgetContainer = document.createElement('div')
    this.widgetContainer.classList.add('widget-container', 'widget-hidden')

    this.createWidgetContent()

    container.appendChild(this.widgetContainer)
    container.appendChild(buttonContainer)

    this.setControlElements()
    this.setInitialValues()
    this.addEventListeners()
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <header class="widget-header">
        <h3>Theme Options</h3>
      </header>
      <form class="widget-form">
        <div class="widget-field post-field">
          <label for="post-header-layout">Post header layout</label>
          <select id="post-header-layout">
            <option value="split-half">Split in half</option>
            <option value="stacked">Stacked</option>
            <option value="large-background">Large background</option>
          </select>
        </div>
        <div class="widget-field color">
          <label for="accent-color">Accent color</label>
          <input type="color" id="accent-color" value="#000000" />
        </div>
        <div class="widget-field">
          <label for="title-font">Title font</label>
          <select id="title-font">
            <option value="ClashDisplay-Variable">Clash Display</option>
            <option value="GeneralSans-Variable">General Sans</option>
            <option value="Literata-Variable">Literata</option>
          </select>
        </div>
        <div class="widget-field">
          <label for="body-font">Body font</label>
          <select id="body-font">
            <option value="ClashDisplay-Variable">Clash Display</option>
            <option value="GeneralSans-Variable" selected>General Sans</option>
            <option value="Literata-Variable">Literata</option>
          </select>
        </div>
        <div class="widget-field homepage-field">
          <label for="hero-layout">Hero layout</label>
          <select id="hero-layout">
            <option value="split-half">Split in half</option>
            <option value="large-background">Large background</option>
            <option value="side-by-side">Side by side</option>
            <option value="typographic-centered">Typographic and center aligned</option>
          </select>
        </div>
        <div class="widget-field color homepage-field">
          <label for="hero-foreground-color">Hero foreground color</label>
          <input type="color" id="hero-foreground-color" value="#000000" />
        </div>
        <div class="widget-field color homepage-field">
          <label for="hero-background-color">Hero background color</label>
          <input type="color" id="hero-background-color" value="#ffffff" />
        </div>
        <div class="widget-field homepage-field">
          <label for="hero-title-text">Hero title</label>
          <input type="text" value="" id="hero-title-text">
        </div>
        <div class="widget-field homepage-field">
          <label for="hero-tagline-text">Hero description</label>
          <input type="text" value="" id="hero-tagline-text">
        </div>
        <div class="widget-field homepage-field">
          <label for="hero-image">Hero image</label>
          <input type="file" id="hero-image" accept=".jpg, .jpeg, .png, .webp">
        </div>
        <div class="widget-field homepage-field">
          <label for="post-card-layout">Post card layout</label>
          <select id="post-card-layout">
            <option value="normal">Normal</option>
            <option value="showcase">Showcase</option>
          </select>
        </div>
        <div class="widget-field">
          <label for="navigation-bar-style">Navigation bar style</label>
          <select id="navigation-bar-style">
            <option value="Normal">Normal</option>
            <option value="Sticky">Sticky</option>
            <option value="Floating" selected>Floating</option>
          </select>
        </div>
        <div class="widget-field">
          <label for="footnote-text">Footnote custom text</label>
          <input type="text" value="" id="footnote-text">
        </div>
      </form>
      <div class="widget-footer">
        <button id="widget-reset-button" class="bo-button small reset">Reset all</button>
        <a href="https://eddiesigner.gumroad.com/l/bold?ref=bold.eduardogomez.io" class="bo-button small" target="_blank" rel="noopener">Buy Bold</a>
      </div>
    `
  }

  injectStyles(id, stylesContent) {
    const styleTag = document.createElement('style')
    styleTag.id = id
    styleTag.innerHTML = stylesContent.replace(/^\s+|\n/gm, '')
    document.head.appendChild(styleTag)
  }

  getCssVariableValue(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable)
  }

  setCssVariableValue(variable, value) {
    document.documentElement.style.setProperty(variable, value)
  }

  toggleOpen() {
    this.open = !this.open
    this.widgetContainer.classList.toggle('widget-hidden')
    this.widgetIcon.classList.toggle('widget-hidden')
    this.closeIcon.classList.toggle('widget-hidden')
  }

  setControlElements() {
    this.accentColorControl = document.getElementById('accent-color')
    this.titleFontControl = document.getElementById('title-font')
    this.bodyFontControl = document.getElementById('body-font')
    this.heroLayoutControl = document.getElementById('hero-layout')
    this.heroForegroundColorControl = document.getElementById('hero-foreground-color')
    this.heroBackgroundColorControl = document.getElementById('hero-background-color')
    this.heroTitleControl = document.getElementById('hero-title-text')
    this.originalHeroTitleContent = document.querySelector('.bo-home-header__title') ? document.querySelector('.bo-home-header__title').innerHTML : ''
    this.heroTaglineControl = document.getElementById('hero-tagline-text')
    this.originalHeroTaglineContent = document.querySelector('.bo-home-header__description') ? document.querySelector('.bo-home-header__description').innerHTML : ''
    this.heroImageControl = document.getElementById('hero-image')
    this.navigationBarStyleControl = document.getElementById('navigation-bar-style')
    this.footnoteTextControl = document.getElementById('footnote-text')
    this.originalFootnoteContent = document.querySelector('.bo-footer-secondary__note') ? document.querySelector('.bo-footer-secondary__note').innerHTML : ''
    this.postCardLayoutControl = document.getElementById('post-card-layout')
    this.postHeaderLayoutControl = document.getElementById('post-header-layout')
    this.widgetResetButton = document.getElementById('widget-reset-button')
  }

  setInitialValues() {
    this.accentColorControl.value = this.getCssVariableValue('--accent')
    this.heroForegroundColorControl.value = this.getCssVariableValue('--header-foreground-color')
    this.heroBackgroundColorControl.value = this.getCssVariableValue('--header-background-color')
  }

  addEventListeners() {
    this.accentColorControl.addEventListener('input', this.changeAccentColor.bind(this))
    this.titleFontControl.addEventListener('change', this.changeTitleFont.bind(this))
    this.bodyFontControl.addEventListener('change', this.changeBodyFont.bind(this))
    this.heroLayoutControl.addEventListener('change', this.changeHeroLayout.bind(this))
    this.heroForegroundColorControl.addEventListener('input', this.changeHeroForegroundColor.bind(this))
    this.heroBackgroundColorControl.addEventListener('input', this.changeHeroBackgroundColor.bind(this))
    this.heroTitleControl.addEventListener('input', this.changeHeroTitle.bind(this))
    this.heroTaglineControl.addEventListener('input', this.changeHeroTagline.bind(this))
    this.heroImageControl.addEventListener('change', this.changeHeroImage.bind(this))
    this.navigationBarStyleControl.addEventListener('change', this.changeNavigationBarStyle.bind(this))
    this.footnoteTextControl.addEventListener('input', this.changeFootnoteText.bind(this))
    this.postHeaderLayoutControl.addEventListener('change', this.changePostHeaderLayout.bind(this))
    this.postCardLayoutControl.addEventListener('change', this.changePostCardLayout.bind(this))
    this.widgetResetButton.addEventListener('click', this.resetAll.bind(this))
  }

  changeAccentColor(event) {
    this.setCssVariableValue('--accent', event.target.value)
  }

  changeTitleFont(event) {
    const value = event.target.value
    this.setCssVariableValue('--title-font', value)
    if (value === 'GeneralSans-Variable' || value === 'Literata-Variable') {
      this.setCssVariableValue('--headings-weight', '600')
    } else {
      this.setCssVariableValue('--headings-weight', '500')
    }
  }

  changeBodyFont(event) {
    this.setCssVariableValue('--body-font', event.target.value)
  }

  changeHeroLayout(event) {
    const heroSection = document.querySelector('.bo-home-header')
    heroSection.classList.remove('split-half', 'large-background', 'side-by-side', 'typographic-centered')
    heroSection.classList.add(event.target.value)
  }

  changeHeroForegroundColor(event) {
    this.setCssVariableValue('--header-foreground-color', event.target.value)
  }

  changeHeroBackgroundColor(event) {
    this.setCssVariableValue('--header-background-color', event.target.value)
    this.setCssVariableValue('--header-translucent-color', `${event.target.value}80`)
  }

  changeHeroTitle(event) {
    const heroTitle = document.querySelector('.bo-home-header__title')
    heroTitle.innerHTML = event.target.value ? event.target.value : this.originalHeroTitleContent
  }

  changeHeroTagline(event) {
    const heroTagline = document.querySelector('.bo-home-header__description')
    heroTagline.innerHTML = event.target.value ? event.target.value : this.originalHeroTaglineContent
  }

  changeHeroImage(event) {
    const heroImage = document.querySelector('.bo-home-header__image img')
    const file = event.target.files[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      heroImage.src = e.target.result
      heroImage.srcset = ''
    }
    reader.readAsDataURL(file)
  }

  changeNavigationBarStyle(event) {
    const value = event.target.value
    const header = document.querySelector('.bo-header')
    if (value === 'Sticky' || value === 'Floating') {
      this.setCssVariableValue('--header-style', 'fixed')
    } else {
      this.setCssVariableValue('--header-style', 'absolute')
    }
    if (value === 'Floating') {
      header.style.opacity = ''
      header.style.transform = ''
    } else {
      header.style.opacity = '1'
      header.style.transform = 'none'
    }
  }

  changeFootnoteText(event) {
    const footnote = document.querySelector('.bo-footer-secondary__note')
    footnote.innerHTML = event.target.value ? event.target.value : this.originalFootnoteContent
  }

  changePostHeaderLayout(event) {
    const postHeader = document.querySelector('.bo-post-header')
    postHeader.classList.remove('split-half', 'stacked', 'large-background')
    postHeader.classList.add(event.target.value)
    const postSummary = document.querySelector('.bo-summary')
    if (postSummary) {
      postSummary.classList.remove('split-half', 'stacked', 'large-background')
      postSummary.classList.add(event.target.value)
    }
  }

  changePostCardLayout(event) {
    const section = document.querySelector('.bo-home-header + script + .bo-wrapper section.bo-generic-wrapper')
    const postsContainer = document.querySelector('.bo-posts-container')
    const postCards = document.querySelectorAll('.bo-post-card')
    const pagination = document.querySelector('.bo-pagination')
    if (event.target.value === 'showcase') {
      section.classList.add('in-showcase')
      postsContainer.classList.add('in-showcase')
      postCards.forEach((postCard) => postCard.classList.add('showcase'))
      pagination.classList.add('more-space')
      this.injectStyles('showcase-styles', showcaseStyles)
    } else {
      section.classList.remove('in-showcase')
      postsContainer.classList.remove('in-showcase')
      postCards.forEach((postCard) => postCard.classList.remove('showcase'))
      pagination.classList.remove('more-space')
      const styleTag = document.getElementById('showcase-styles')
      if (styleTag) {
        styleTag.remove()
      }
    }
  }

  resetAll() {
    window.location.reload()
  }
}

function initializeWidget() {
  return new ThemeWidget()
}

initializeWidget()
