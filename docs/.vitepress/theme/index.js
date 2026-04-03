import DefaultTheme from 'vitepress/theme'
import './style.css'
import { h, onMounted } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      // 粒子跟随动画脚本
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '9999'
      document.body.appendChild(canvas)

      let width, height
      let particles = []
      const mouse = { x: null, y: null, radius: 100 }

      const resize = () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }

      window.addEventListener('resize', resize)
      resize()

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.x
        mouse.y = e.y
      })

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
          let dx = mouse.x - this.x
          let dy = mouse.y - this.y
          let distance = Math.sqrt(dx * dx + dy * dy)
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
        requestAnimationFrame(animate)
      }

      init()
      animate()
    })
  }
}
