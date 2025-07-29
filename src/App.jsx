import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Gift, Cake, PartyPopper, Star } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

function App() {
  const [showMessage, setShowMessage] = useState(false)
  const [balloons, setBalloons] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [particles, setParticles] = useState([])
  const [floatingHearts, setFloatingHearts] = useState([])
  const [birthdayIcons, setBirthdayIcons] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentQuote, setCurrentQuote] = useState(0)

  const btsQuotes = [
    "Love yourself, love myself, peace 💜",
    "You're the one I need 💜",
    "Life goes on, let's live on 💜",
    "I'm the one I should love in this world 💜",
    "Dream, hope, forward, forward 💜"
  ]

  // Generate floating balloons with more variety
  useEffect(() => {
    const generateBalloons = () => {
      const newBalloons = []
      const colors = ['#E6E6FA', '#DDA0DD', '#DA70D6', '#BA55D3', '#9370DB', '#8A2BE2', '#9932CC']
      for (let i = 0; i < 20; i++) {
        newBalloons.push({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 10 + Math.random() * 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 0.8 + Math.random() * 0.4
        })
      }
      setBalloons(newBalloons)
    }
    generateBalloons()
  }, [])

  // Generate enhanced sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = []
      for (let i = 0; i < 50; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 4,
          duration: 2 + Math.random() * 3,
          size: 0.5 + Math.random() * 1
        })
      }
      setSparkles(newSparkles)
    }
    generateSparkles()
    const interval = setInterval(generateSparkles, 5000)
    return () => clearInterval(interval)
  }, [])

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 4 + Math.random() * 4,
          opacity: 0.3 + Math.random() * 0.4
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
    const interval = setInterval(generateParticles, 6000)
    return () => clearInterval(interval)
  }, [])

  // Generate more floating hearts
  useEffect(() => {
    const generateFloatingHearts = () => {
      const newHearts = []
      for (let i = 0; i < 25; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 6 + Math.random() * 4,
          size: 0.6 + Math.random() * 0.8,
          color: ['#FF69B4', '#FF1493', '#DC143C', '#B22222', '#8B0000'][Math.floor(Math.random() * 5)]
        })
      }
      setFloatingHearts(newHearts)
    }
    generateFloatingHearts()
    const interval = setInterval(generateFloatingHearts, 8000)
    return () => clearInterval(interval)
  }, [])

  // Generate birthday icons (cakes, stars, etc.)
  useEffect(() => {
    const generateBirthdayIcons = () => {
      const newIcons = []
      const icons = ['cake', 'star', 'gift']
      for (let i = 0; i < 15; i++) {
        newIcons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 6,
          duration: 8 + Math.random() * 4,
          size: 0.7 + Math.random() * 0.6,
          type: icons[Math.floor(Math.random() * icons.length)],
          color: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#9370DB'][Math.floor(Math.random() * 5)]
        })
      }
      setBirthdayIcons(newIcons)
    }
    generateBirthdayIcons()
    const interval = setInterval(generateBirthdayIcons, 10000)
    return () => clearInterval(interval)
  }, [])

  // Update quotes
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % btsQuotes.length)
    }, 4000)
    
    return () => {
      clearInterval(quoteTimer)
    }
  }, [])

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const balloonVariants = {
    initial: { y: '100vh', opacity: 0, rotate: 0 },
    animate: (custom) => ({
      y: '-100vh',
      opacity: [0, 1, 1, 0],
      x: [custom.x + '%', (custom.x + 15) + '%', (custom.x - 10) + '%'],
      rotate: [0, 360, 720],
      scale: [custom.size, custom.size * 1.2, custom.size],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  }

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0, rotate: 0 },
    animate: (custom) => ({
      scale: [0, custom.size, 0],
      opacity: [0, 1, 0],
      rotate: [0, 360, 720],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  }

  const particleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (custom) => ({
      scale: [0, 1, 0],
      opacity: [0, custom.opacity, 0],
      y: [0, -50, -100],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: 'easeOut'
      }
    })
  }

  const floatingHeartVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (custom) => ({
      y: [0, -40, 0],
      opacity: [0.4, 0.9, 0.4],
      scale: [custom.size * 0.8, custom.size * 1.3, custom.size * 0.8],
      rotate: [0, 360],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  }

  const birthdayIconVariants = {
    initial: { scale: 0, opacity: 0, rotate: 0 },
    animate: (custom) => ({
      y: [0, -30, 0],
      opacity: [0.5, 1, 0.5],
      scale: [custom.size * 0.9, custom.size * 1.2, custom.size * 0.9],
      rotate: [0, 180, 360],
      transition: {
        duration: custom.duration,
        delay: custom.delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  }

  const renderIcon = (icon) => {
    switch (icon.type) {
      case 'cake':
        return <Cake className="w-full h-full" style={{ color: icon.color }} />
      case 'star':
        return <Star className="w-full h-full fill-current" style={{ color: icon.color }} />
      case 'gift':
        return <Gift className="w-full h-full" style={{ color: icon.color }} />
      default:
        return <Cake className="w-full h-full" style={{ color: icon.color }} />
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-lavender-100">
      {/* Dynamic Background with Mouse Interaction */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-200/60 via-pink-100/40 to-lavender-200/60 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(186, 85, 211, 0.3) 0%, rgba(221, 160, 221, 0.2) 25%, rgba(230, 230, 250, 0.1) 50%)`
        }}
      ></div>
      
      {/* Floating Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute z-10"
          style={{ 
            left: balloon.x + '%',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))'
          }}
          variants={balloonVariants}
          initial="initial"
          animate="animate"
          custom={balloon}
        >
          <div 
            className="rounded-full shadow-xl relative"
            style={{ 
              backgroundColor: balloon.color,
              width: `${balloon.size * 32}px`,
              height: `${balloon.size * 40}px`,
              background: `linear-gradient(135deg, ${balloon.color}, ${balloon.color}dd)`
            }}
          >
            <div className="absolute top-2 left-2 w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-12 bg-gray-600"></div>
          </div>
        </motion.div>
      ))}

      {/* Enhanced Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute z-20"
          style={{ 
            left: sparkle.x + '%', 
            top: sparkle.y + '%' 
          }}
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
          custom={sparkle}
        >
          <Sparkles className="text-yellow-400" style={{ width: `${sparkle.size * 16}px`, height: `${sparkle.size * 16}px` }} />
        </motion.div>
      ))}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute z-15"
          style={{ 
            left: particle.x + '%', 
            top: particle.y + '%' 
          }}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          custom={particle}
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
        </motion.div>
      ))}

      {/* More Floating Hearts */}
      {floatingHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute z-20"
          style={{ 
            left: heart.x + '%', 
            top: heart.y + '%' 
          }}
          variants={floatingHeartVariants}
          initial="initial"
          animate="animate"
          custom={heart}
        >
          <Heart 
            className="fill-current" 
            style={{ 
              color: heart.color,
              width: `${heart.size * 24}px`, 
              height: `${heart.size * 24}px` 
            }} 
          />
        </motion.div>
      ))}

      {/* Birthday Icons */}
      {birthdayIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute z-20"
          style={{ 
            left: icon.x + '%', 
            top: icon.y + '%',
            width: `${icon.size * 32}px`,
            height: `${icon.size * 32}px`
          }}
          variants={birthdayIconVariants}
          initial="initial"
          animate="animate"
          custom={icon}
        >
          {renderIcon(icon)}
        </motion.div>
      ))}

      {/* Floating "Jaan" Text */}
      <motion.div
        className="absolute z-30 text-4xl font-bold text-pink-600"
        style={{ 
          left: '20%', 
          top: '30%',
          textShadow: '0 0 20px rgba(255, 105, 180, 0.6)'
        }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        Jaan 💕
      </motion.div>

      {/* Another Floating "Jaan" */}
      <motion.div
        className="absolute z-30 text-3xl font-bold text-purple-600"
        style={{ 
          right: '15%', 
          top: '60%',
          textShadow: '0 0 15px rgba(147, 112, 219, 0.6)'
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.6, 1, 0.6],
          scale: [0.9, 1.2, 0.9],
          rotate: [0, -5, 5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      >
        Jaan 💜
      </motion.div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#E6E6FA', '#DDA0DD', '#DA70D6', '#BA55D3', '#9370DB'][Math.floor(Math.random() * 5)],
                  left: Math.random() * 100 + '%',
                  top: '-10px'
                }}
                initial={{ y: -10, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: window.innerHeight + 10, 
                  opacity: 0, 
                  rotate: 360,
                  x: Math.random() * 200 - 100
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-25 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        
        {/* Header Section with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent mb-4"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              textShadow: [
                '0 0 0px rgba(147, 112, 219, 0)',
                '0 0 30px rgba(147, 112, 219, 0.8)',
                '0 0 0px rgba(147, 112, 219, 0)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            Happy Birthday
          </motion.h1>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-purple-800 mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
              textShadow: [
                '0 0 0px rgba(147, 112, 219, 0)',
                '0 0 40px rgba(147, 112, 219, 0.6)',
                '0 0 0px rgba(147, 112, 219, 0)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Elvita! 💜
          </motion.h2>
        </motion.div>

        {/* Interactive Age Celebration */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 1, type: "spring" }}
          className="mb-8"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          onHoverStart={() => triggerConfetti()}
        >
          <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-10 border-2 border-purple-300/50 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20"></div>
            <div className="relative z-10">
              <motion.div 
                className="text-3xl text-purple-700 mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Welcome to your
              </motion.div>
              <motion.div 
                className="text-8xl font-bold text-purple-800 mb-3"
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['#6B21A8', '#9333EA', '#6B21A8']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                23rd
              </motion.div>
              <motion.div 
                className="text-3xl text-purple-700"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                year of amazing adventures!
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Animated Heart with Pulse Effect */}
        <motion.div
          className="mb-8 relative"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.5 }}
        >
          <Heart className="w-20 h-20 text-pink-500 fill-current relative z-10" />
          <motion.div
            className="absolute inset-0 w-20 h-20"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 text-pink-300 fill-current" />
          </motion.div>
        </motion.div>

        {/* Interactive Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mb-8 flex flex-wrap gap-4 justify-center"
        >
          <Button
            onClick={() => setShowMessage(!showMessage)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-xl rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className="w-6 h-6 mr-2" />
            {showMessage ? 'Hide Message' : 'Special Message'}
          </Button>

          <Button
            onClick={triggerConfetti}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 text-xl rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <PartyPopper className="w-6 h-6 mr-2" />
            Celebrate!
          </Button>
        </motion.div>

        {/* Enhanced Special Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.5, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -100, scale: 0.5, rotateX: -90 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="max-w-3xl mx-auto mb-8"
            >
              <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-10 border-2 border-purple-200/50 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 to-pink-300/30"></div>
                <div className="relative z-10 text-lg md:text-xl text-purple-800 leading-relaxed space-y-6">
                  <motion.p 
                    className="font-bold text-2xl text-purple-900"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    My Dearest Elvita,
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    On this magical day, as you turn 23, I want you to know how incredibly special you are to me. 
                    Your beautiful soul appreciates art, music, and the power of dreams.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Just like the purple you love so much, you bring color and vibrancy to my world. 
                    May this new year of your life be filled with endless love, laughter, and all the happiness you deserve.
                  </motion.p>
                  <motion.p 
                    className="font-bold text-2xl text-purple-900"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    Happy 23rd Birthday, my love! 💜✨
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rotating BTS Quotes */}
        <motion.div
          className="mb-8"
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-purple-200/30">
            <div className="text-lg text-purple-700 italic font-medium">
              "{btsQuotes[currentQuote]}"
            </div>
          </div>
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 text-purple-600 text-lg font-medium"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Made with 💜 for the most amazing person
          </motion.div>
        </motion.div>
      </div>

      {/* Cursor Trail Effect */}
      <motion.div
        className="fixed w-6 h-6 bg-purple-400/30 rounded-full pointer-events-none z-50 mix-blend-multiply"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  )
}

export default App

