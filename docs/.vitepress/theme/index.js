import DefaultTheme from 'vitepress/theme'
import './style.css'
import { h, onMounted, onUnmounted, ref, nextTick } from 'vue'

function GithubIconLink() {
  return h(
    'a',
    {
      class: 'smzk-gh',
      href: 'https://github.com/Gold-Fox2024/SMZK',
      target: '_blank',
      rel: 'noreferrer'
    },
    [
      h(
        'svg',
        { viewBox: '0 0 24 24', 'aria-hidden': 'true' },
        [
          h('path', {
            d: 'M12 .5C5.73.5.75 5.66.75 12.1c0 5.14 3.29 9.5 7.86 11.04.58.11.79-.26.79-.57 0-.28-.01-1.02-.02-2-3.2.71-3.88-1.58-3.88-1.58-.52-1.36-1.27-1.72-1.27-1.72-1.04-.73.08-.72.08-.72 1.15.08 1.75 1.21 1.75 1.21 1.02 1.8 2.67 1.28 3.32.98.1-.76.4-1.28.72-1.57-2.55-.3-5.23-1.31-5.23-5.82 0-1.29.44-2.35 1.16-3.18-.12-.3-.5-1.5.11-3.13 0 0 .95-.31 3.11 1.21.9-.26 1.86-.39 2.82-.39.96 0 1.92.13 2.82.39 2.16-1.52 3.11-1.21 3.11-1.21.61 1.63.23 2.83.11 3.13.72.83 1.16 1.89 1.16 3.18 0 4.52-2.69 5.52-5.25 5.81.41.37.78 1.09.78 2.2 0 1.59-.02 2.87-.02 3.26 0 .32.2.69.8.57 4.57-1.54 7.86-5.9 7.86-11.04C23.25 5.66 18.27.5 12 .5Z'
          })
        ]
      )
    ]
  )
}

const SitePlaque = {
  setup() {
    const url = ref('')
    onMounted(() => {
      url.value = location.origin
    })
    return () =>
      url.value
        ? h('div', { class: 'smzk-plaque' }, [h('span', { class: 'url' }, url.value)])
        : null
  }
}

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-title-before': () => GithubIconLink(),
      'nav-bar-content-after': () => h(SitePlaque)
    }),
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    router.onBeforeRouteChange = () => {
      if (
        !document.startViewTransition ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return
      }

      return new Promise((resolve) => {
        document.startViewTransition(async () => {
          resolve()
          await nextTick()
        })
      })
    }
  },
  setup() {
    let cleanup = null

    onUnmounted(() => {
      if (cleanup) cleanup()
    })

    onMounted(() => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '9999'
      document.body.appendChild(canvas)

      let width, height
      let particles = []
      const mouse = { x: null, y: null, radius: 100 }
      let animationFrameId = null

      const resize = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }

      const handleMouseMove = (e) => {
        mouse.x = e.x
        mouse.y = e.y
      }

      window.addEventListener('resize', resize)
      resize()

      window.addEventListener('mousemove', handleMouseMove)

      class Particle {
        constructor() {
          this.x = Math.random() * width
          this.y = Math.random() * height
          this.size = Math.random() * 1.5 + 0.5
          this.speedX = Math.random() * 0.5 - 0.25
          this.speedY = Math.random() * 0.5 - 0.25
          const colors = ['rgba(255,255,255,0.8)', 'rgba(147,197,253,0.6)', 'rgba(196,181,253,0.6)']
          this.color = colors[Math.floor(Math.random() * colors.length)]
        }

        draw() {
          ctx.fillStyle = this.color
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fill()
        }

        update() {
          this.x += this.speedX
          this.y += this.speedY

          if (this.x > width) this.x = 0
          else if (this.x < 0) this.x = width
          if (this.y > height) this.y = 0
          else if (this.y < 0) this.y = height

          if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x
            let dy = mouse.y - this.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 120) {
              this.x -= dx * 0.02
              this.y -= dy * 0.02
            }
          }
        }
      }

      function connect() {
        let opacityValue = 1
        for (let a = 0; a < particles.length; a++) {
          for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x
            let dy = particles[a].y - particles[b].y
            let distance = dx * dx + dy * dy
            if (distance < 12000) {
              opacityValue = 1 - (distance / 12000)
              ctx.strokeStyle = `rgba(147, 197, 253, ${opacityValue * 0.25})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particles[a].x, particles[a].y)
              ctx.lineTo(particles[b].x, particles[b].y)
              ctx.stroke()
            }
          }
        }
      }

      function init() {
        particles = []
        let particleCount = Math.min(Math.floor((width * height) / 12000), 150)
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }
      }

      function animate() {
        ctx.clearRect(0, 0, width, height)
        for (let i = 0; i < particles.length; i++) {
          particles[i].draw()
          particles[i].update()
        }
        connect()
        animationFrameId = requestAnimationFrame(animate)
      }

      init()
      animate()

      cleanup = () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId)
        }
        window.removeEventListener('resize', resize)
        window.removeEventListener('mousemove', handleMouseMove)
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas)
        }
      }
    })
  }
}
