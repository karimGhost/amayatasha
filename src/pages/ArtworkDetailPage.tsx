import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Tag, ZoomIn } from 'lucide-react';
import { Button, Card, Loader } from '../components/ui';
import { fetchArtworkById, fetchArtworks } from '../lib/artworkApi';
import { formatDate } from '../lib/utils';
import type { Artwork } from '../types';

export function ArtworkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadArtwork(id);
    }
  }, [id]);

  async function loadArtwork(artworkId: string) {
    try {
      const [artworkData, allData] = await Promise.all([
        fetchArtworkById(artworkId),
        fetchArtworks(),
      ]);
      setArtwork(artworkData);
      setAllArtworks(allData);
    } catch (error) {
      console.error('Failed to load artwork:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading artwork..." />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Artwork not found</h2>
          <Link to="/gallery">
            <Button>Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allArtworks.findIndex((a) => a.id === artwork.id);
  const prevArtwork = currentIndex > 0 ? allArtworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex < allArtworks.length - 1 ? allArtworks[currentIndex + 1] : null;

  function navigateArtwork(direction: 'prev' | 'next') {
    const target = direction === 'prev' ? prevArtwork : nextArtwork;
    if (target) {
      navigate(`/artwork/${target.id}`);
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Gallery
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              {artwork.image_urls[currentImageIndex] ? (
                <img
                  src={artwork.image_urls[currentImageIndex]}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-slate-600">No image</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Image Thumbnails */}
            {artwork.image_urls.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {artwork.image_urls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index
                        ? 'border-amber-500 ring-2 ring-amber-500/30'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={url}
                      alt={`${artwork.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm">
              {artwork.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {artwork.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>{formatDate(artwork.created_at)}</span>
              </div>
            </div>

            {/* Description */}
            {artwork.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">About this piece</h3>
                <p className="text-slate-400 leading-relaxed">
                  {artwork.description}
                </p>
              </div>
            )}

            {/* Story */}
            {artwork.story && (
              <Card className="p-6 space-y-3 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-amber-500">The Story Behind</span>
                </h3>
                <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {artwork.story}
                </p>
              </Card>
            )}

            {/* Tags */}
            {artwork.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-500" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-full text-slate-300 text-sm hover:border-amber-500/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-800">
              <button
                onClick={() => navigateArtwork('prev')}
                disabled={!prevArtwork}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  prevArtwork
                    ? 'text-white hover:bg-slate-800'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={() => navigateArtwork('next')}
                disabled={!nextArtwork}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  nextArtwork
                    ? 'text-white hover:bg-slate-800'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={artwork.image_urls[currentImageIndex]}
              alt={artwork.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
