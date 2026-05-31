import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Plus, Trash2, Save, Lock } from 'lucide-react';
import { Button, Card, Input, Textarea, Select, Modal, Loader } from '../components/ui';
import { createArtwork, updateArtwork, deleteArtwork, fetchArtworks } from '../lib/artworkApi';
import { uploadMultipleImages } from '../lib/cloudinary';
import { categories } from '../lib/config';
import type { Artwork, ArtworkFormData, Category } from '../types';

const ADMIN_PASSWORD = 'amaya1234'; // In production, use proper auth

export function UploadPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<ArtworkFormData>({
    title: '',
    description: '',
    category: 'Arts',
    image_urls: [],
    story: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  async function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      loadArtworks();
    } else {
      setMessage({ type: 'error', text: 'Invalid password' });
    }
  }

  async function loadArtworks() {
    setLoading(true);
    try {
      const data = await fetchArtworks();
      setArtworks(data);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  }

  function handleRemoveImage(index: number) {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
    setFormData((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index),
    }));
  }

  function handleAddTag() {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  }

  function handleRemoveTag(tag: string) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setMessage(null);

    try {
      let imageUrls = formData.image_urls;

      if (selectedFiles.length > 0) {
        imageUrls = await uploadMultipleImages(selectedFiles);
      }

      const artworkData = {
        ...formData,
        image_urls: imageUrls,
      };

      if (editingArtwork) {
        await updateArtwork(editingArtwork.id, artworkData);
        setMessage({ type: 'success', text: 'Artwork updated successfully!' });
      } else {
        await createArtwork(artworkData);
        setMessage({ type: 'success', text: 'Artwork uploaded successfully!' });
      }

      resetForm();
      loadArtworks();
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Failed to save artwork. Please try again.' });
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this artwork?')) return;

    try {
      await deleteArtwork(id);
      setMessage({ type: 'success', text: 'Artwork deleted successfully!' });
      loadArtworks();
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: 'Failed to delete artwork.' });
    }
  }

  function handleEdit(artwork: Artwork) {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      description: artwork.description,
      category: artwork.category as Category,
      image_urls: artwork.image_urls,
      story: artwork.story,
      tags: artwork.tags,
    });
    setShowForm(true);
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      category: 'Arts',
      image_urls: [],
      story: '',
      tags: [],
    });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setEditingArtwork(null);
    setShowForm(false);
  }

  function startNewUpload() {
    resetForm();
    setShowForm(true);
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
              <p className="text-slate-400">Enter password to manage artworks</p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full">
                Access Admin Panel
              </Button>
            </div>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
              >
                {message.text}
              </motion.p>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Artwork Management
              </h1>
              <p className="text-slate-400">
                Upload, edit, and manage your art collection
              </p>
            </div>
            <Button onClick={startNewUpload}>
              <Plus className="w-5 h-5 mr-2" />
              New Artwork
            </Button>
          </div>
        </motion.div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Artworks List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    {artwork.image_urls[0] ? (
                      <img
                        src={artwork.image_urls[0]}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-slate-700" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-slate-900/90 text-amber-400 text-xs rounded-full">
                        {artwork.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-white truncate">{artwork.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(artwork)}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDelete(artwork.id)}
                        className="flex-1"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Upload/Edit Modal */}
        <Modal
          isOpen={showForm}
          onClose={resetForm}
          title={editingArtwork ? 'Edit Artwork' : 'Upload New Artwork'}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">
                Images
              </label>
              <div className="grid grid-cols-3 gap-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-lg border-2 border-dashed border-slate-700 hover:border-amber-500/50 flex flex-col items-center justify-center cursor-pointer transition-colors">
                  <Upload className="w-8 h-8 text-slate-500" />
                  <span className="text-xs text-slate-500 mt-1">Add Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Title */}
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Artwork title"
              required
            />

            {/* Category */}
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              options={categories.filter((c) => c !== 'All').map((c) => ({ value: c, label: c }))}
            />

            {/* Description */}
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the artwork"
              rows={3}
            />

            {/* Story */}
            <Textarea
              label="Story Behind the Art"
              value={formData.story}
              onChange={(e) => setFormData({ ...formData, story: e.target.value })}
              placeholder="Share the inspiration and story behind this piece"
              rows={4}
            />

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add a tag"
                />
                <Button type="button" variant="secondary" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={resetForm} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" isLoading={uploading} className="flex-1">
                <Save className="w-5 h-5 mr-2" />
                {editingArtwork ? 'Update' : 'Upload'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
