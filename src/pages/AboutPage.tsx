import { motion } from 'framer-motion';
import { User, Compass, Sparkles, Heart, Wand2 } from 'lucide-react';
import { Card, GlassCard } from '../components/ui';
import { artistInfo } from '../lib/config';

const sections = [
  {
    icon: Compass,
    title: 'My Artistic Journey',
    content: artistInfo.journey,
    gradient: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Wand2,
    title: 'My Style',
    content: artistInfo.style,
    gradient: 'from-amber-500/10 to-orange-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: Heart,
    title: 'My Inspiration',
    content: artistInfo.inspiration,
    gradient: 'from-rose-500/10 to-pink-500/10',
    iconColor: 'text-rose-400',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-3xl border-2 border-dashed border-amber-500/20"
              />
              <div className="absolute -inset-12 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl" />

              {/* Image Frame */}
              <div className="relative w-80 h-96 md:w-[350px] md:h-[420px] rounded-3xl overflow-hidden border-4 border-amber-500/20 shadow-2xl shadow-amber-500/10">
                <img
                  src={artistInfo.profileImage}
                  alt={artistInfo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>

              {/* Floating Skill Tags */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl"
              >
                <p className="text-xs text-slate-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-1 max-w-40">
                  {artistInfo.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm">
              <User className="w-4 h-4" />
              About Me
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">Hi, I'm </span>
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {artistInfo.name}
              </span>
            </h1>

            <p className="text-xl text-slate-300 font-light">{artistInfo.title}</p>

            <p className="text-lg text-slate-400 leading-relaxed">{artistInfo.bio}</p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <Card className="p-4 text-center bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
                <p className="text-3xl font-bold text-amber-400">10+</p>
                <p className="text-sm text-slate-400">Years Experience</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-500/20">
                <p className="text-3xl font-bold text-orange-400">50+</p>
                <p className="text-sm text-slate-400">Artworks Created</p>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Story Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className={`p-6 h-full bg-gradient-to-br ${section.gradient}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl bg-slate-800/50 ${section.iconColor}`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">{section.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Skills & Tools
            </div>
            <h2 className="text-3xl font-bold text-white">What I Work With</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {artistInfo.skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <GlassCard className="px-6 py-4">
                  <span className="text-slate-200 font-medium">{skill}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-xl" />
          <Card className="relative p-12 text-center border-amber-500/20">
            <blockquote className="text-2xl md:text-3xl text-white font-light italic leading-relaxed max-w-3xl mx-auto">
              "Art is not what you see, but what you make others see."
            </blockquote>
            <p className="mt-6 text-slate-400">- Edgar Degas</p>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
