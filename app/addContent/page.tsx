'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import CategoryManager from '@/components/category'

interface Category {
  _id: string
  title: string
}

interface ContentFormData {
    title: string
    description: string
    category: string
    tags: string[]
    images: Array<{
      alt: string
      url: string
    }>
    videoes: Array<{
      alt: string
      url: string
    }>
  }

export default function ContentForm() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    description: '',
    category: '',
    tags: [],
    images: [],
    videoes: []
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const response = await fetch('/api/category')
    const data = await response.json()
    setCategories(data.categories)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token') // Assuming you store JWT token in localStorage
    
    const response = await fetch('/api/contentApi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token || ''
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      toast.success('Content created successfully')
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        tags: [],
        images: [],
        videoes: []
      })
    } else {
      toast.error('Failed to create content')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20 pb-24">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 rounded border"
            required
          />
        </div>
        <div>
  <label className="block mb-2">Images</label>
  <div className="space-y-2">
    {formData.images.map((image, index) => (
      <div key={index} className="flex gap-2">
        <input
          type="text"
          placeholder="Image URL"
          value={image.url}
          onChange={(e) => {
            const newImages = [...formData.images]
            newImages[index].url = e.target.value
            setFormData({...formData, images: newImages})
          }}
          className="flex-1 px-4 py-2 rounded border"
        />
        <input
          type="text"
          placeholder="Alt Text"
          value={image.alt}
          onChange={(e) => {
            const newImages = [...formData.images]
            newImages[index].alt = e.target.value
            setFormData({...formData, images: newImages})
          }}
          className="flex-1 px-4 py-2 rounded border"
        />
        <button
          type="button"
          onClick={() => {
            const newImages = formData.images.filter((_, i) => i !== index)
            setFormData({...formData, images: newImages})
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => setFormData({
        ...formData,
        images: [...formData.images, { url: '', alt: '' }]
      })}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Add Image
    </button>
  </div>
</div>
<div>
  <label className="block mb-2">Videos</label>
  <div className="space-y-2">
    {formData.videoes.map((video, index) => (
      <div key={index} className="flex gap-2">
        <input
          type="text"
          placeholder="Video URL"
          value={video.url}
          onChange={(e) => {
            const newVideos = [...formData.videoes]
            newVideos[index].url = e.target.value
            setFormData({...formData, videoes: newVideos})
          }}
          className="flex-1 px-4 py-2 rounded border"
        />
        <input
          type="text"
          placeholder="Alt Text"
          value={video.alt}
          onChange={(e) => {
            const newVideos = [...formData.videoes]
            newVideos[index].alt = e.target.value
            setFormData({...formData, videoes: newVideos})
          }}
          className="flex-1 px-4 py-2 rounded border"
        />
        <button
          type="button"
          onClick={() => {
            const newVideos = formData.videoes.filter((_, i) => i !== index)
            setFormData({...formData, videoes: newVideos})
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={() => setFormData({
        ...formData,
        videoes: [...formData.videoes, { url: '', alt: '' }]
      })}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Add Video
    </button>
  </div>
</div>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 rounded border"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="button"
            onClick={() => setShowCategoryModal(true)}
            className="mt-7 px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            +
          </button>
        </div>

        <div>
  <label className="block mb-2">Tags</label>
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Add tag and press Enter"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          const value = e.currentTarget.value.trim()
          if (value) {
            setFormData({
              ...formData,
              tags: [...formData.tags, value]
            })
            e.currentTarget.value = ''
          }
        }
      }}
      className="flex-1 px-4 py-2 rounded border"
    />
  </div>
  <div className="flex flex-wrap gap-2 mt-2">
    {formData.tags.map((tag, index) => (
      <span
        key={index}
        className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1"
      >
        {tag}
        <button
          type="button"
          onClick={() => {
            const newTags = formData.tags.filter((_, i) => i !== index)
            setFormData({...formData, tags: newTags})
          }}
          className="text-red-500"
        >
          ×
        </button>
      </span>
    ))}
  </div>
</div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-2 rounded border"
            rows={3}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Content
        </button>
      </form>

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4">
            <CategoryManager />
            <button
              onClick={() => {
                setShowCategoryModal(false)
                fetchCategories() // Refresh categories after modal closes
              }}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
