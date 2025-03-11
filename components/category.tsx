'use client'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface Category {
  _id: string
  title: string
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

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
    
    if (editingCategory) {
      // Update existing category
      const response = await fetch(`/api/category/${editingCategory._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'id': editingCategory._id
        },
        body: JSON.stringify({ name: newCategory })
      })

      if (response.ok) {
        toast.success('Category updated successfully')
        setEditingCategory(null)
      }
    } else {
      // Create new category
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newCategory })
      })

      if (response.ok) {
        toast.success('Category created successfully')
      }
    }

    setNewCategory('')
    fetchCategories()
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/category/id`, {
      method: 'DELETE',
      headers: { 'id': id }
    })

    if (response.ok) {
      toast.success('Category deleted successfully')
      fetchCategories()
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Category Management
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editingCategory ? 'Update' : 'Add'} Category
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <span className="text-lg">{category.title}</span>
            <div className="flex gap-2">
              
              <button
                onClick={() => handleDelete(category._id)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
