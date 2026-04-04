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
          this.size = Math.random() * 2 + 1
          this.baseX = this.x
          this.baseY = this.y
          this.density = (Math.random() * 30) + 1
        }

        draw() {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.5)'
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        }

        update() {
          if (mouse.x === null || mouse.y === null) return

          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 0.001) return
          let forceDirectionX = dx / distance
          let forceDirectionY = dy / distance
          let maxDistance = mouse.radius
          let force = (maxDistance - distance) / maxDistance
          let directionX = forceDirectionX * force * this.density
          let directionY = forceDirectionY * force * this.density

          if (distance < mouse.radius) {
            this.x += directionX
            this.y += directionY
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX
              this.x -= dx / 10
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY
              this.y -= dy / 10
            }
          }
        }
      }

      function init() {
        particles = []
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle())
        }
      }

      function animate() {
        ctx.clearRect(0, 0, width, height)
        for (let i = 0; i < particles.length; i++) {
          particles[i].draw()
          particles[i].update()
        }
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
