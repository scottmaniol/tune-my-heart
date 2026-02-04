import { useState, useRef, useEffect } from 'react';
import { Resource } from '../../data/resourcesData';
import { Upload, X } from 'lucide-react';

interface ResourceFormProps {
  resource?: Resource & { id: string };
  onSubmit: (data: Omit<Resource, 'id'>) => void;
  onCancel: () => void;
  onImageUpload?: (file: File, resourceId: string) => void;
  onNewResourceImageSelect?: (file: File) => void;
  uploadingImage?: boolean;
}

const ResourceForm = ({ resource, onSubmit, onCancel, onImageUpload, onNewResourceImageSelect, uploadingImage }: ResourceFormProps) => {
  const [formData, setFormData] = useState<Omit<Resource, 'id'>>({
    title: resource?.title || '',
    description: resource?.description || '',
    type: resource?.type || 'book',
    price: resource?.price || '',
    coverImage: resource?.coverImage || '',
    link: resource?.link || '',
    category: resource?.category || 'print',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newResourceFileInputRef = useRef<HTMLInputElement>(null);

  // Sync form data with resource prop when it changes (e.g., after image upload)
  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        price: resource.price || '',
        coverImage: resource.coverImage || '',
        link: resource.link,
        category: resource.category,
      });
    }
  }, [resource]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload && resource?.id) {
      onImageUpload(file, resource.id);
    }
  };

  const handleNewResourceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      if (onNewResourceImageSelect) {
        onNewResourceImageSelect(file);
      }
    }
  };

  const clearSelectedImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    if (newResourceFileInputRef.current) {
      newResourceFileInputRef.current.value = '';
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as Resource['type'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="book">Book</option>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="link">Link</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Resource['category'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="print">Print Resource</option>
            <option value="download">Free Download</option>
            <option value="web">Web Link</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (optional)
        </label>
        <input
          type="text"
          placeholder="e.g., $23.00"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link/URL *
        </label>
        <input
          type="url"
          required
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image
        </label>
        
        {!resource?.id && (
          <div className="mt-2">
            <input
              ref={newResourceFileInputRef}
              type="file"
              accept="image/*"
              onChange={handleNewResourceImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => newResourceFileInputRef.current?.click()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Image File
            </button>
            {selectedFile && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={clearSelectedImage}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 w-auto object-contain border border-gray-200 rounded"
                />
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Or enter a URL below (file upload will be prioritized)
            </p>
          </div>
        )}

        <input
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
          placeholder="https://example.com/image.jpg"
        />
        
        {resource?.id && onImageUpload && (
          <div className="mt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadingImage ? 'Uploading...' : 'Upload New Image'}
            </button>
          </div>
        )}

        {formData.coverImage && resource?.id && (
          <div className="mt-2">
            <img
              src={formData.coverImage}
              alt="Preview"
              className="h-32 w-auto object-contain border border-gray-200 rounded"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {resource ? 'Update Resource' : 'Add Resource'}
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
