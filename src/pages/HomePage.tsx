import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, Camera, Image } from 'lucide-react';
import { Button } from '../components/ui';
import { artistInfo } from '../lib/config';
 
const floatingShapes = [
  { size: 400, x: '10%', y: '20%', delay: 0, duration: 20 },
  { size: 300, x: '80%', y: '60%', delay: 2, duration: 25 },
  { size: 200, x: '70%', y: '10%', delay: 4, duration: 18 },
  { size: 250, x: '20%', y: '70%', delay: 1, duration: 22 },
];

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
            }}
            className="absolute rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-3xl"
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm"
            >
              <Image className="w-4 h-4" />
              Visual Storyteller
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                {artistInfo.name.split(' ')[0]}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 font-light">
              {artistInfo.title}
            </p>

            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              {artistInfo.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/gallery">
                <Button size="lg">
                  View Gallery
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg">
                  About Me
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Contact Me
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-slate-800/50">
              {[
                { icon: Palette, label: 'Artworks', value: '50+' },
                { icon: Camera, label: 'Experience', value: '10+ yrs' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-amber-500/30"
              />

              {/* Glow Effect */}
              <div className="absolute -inset-8 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-full blur-3xl" />

              {/* Image Frame */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                <img
                  src={artistInfo.profileImage}
                  alt={artistInfo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -right-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300">Available for commissions</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="relative py-20 bg-slate-950/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Work
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A glimpse into my artistic journey through colors and forms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: 'https://images.pexels.com/photos/9224637/pexels-photo-9224637.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Abstract Dreams' },
              { image: 'https://images.pexels.com/photos/36880225/pexels-photo-36880225.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Urban Chaos' },
              { image: 'https://images.pexels.com/photos/32228687/pexels-photo-32228687.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Nature\'s Whispers' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/gallery">
              <Button>
                Explore All Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
