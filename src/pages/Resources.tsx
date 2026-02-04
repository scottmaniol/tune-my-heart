import { useState, useEffect } from 'react';
import { BookOpen, Download, ExternalLink, ShoppingCart, FileText, Link as LinkIcon } from 'lucide-react';
import { Resource } from '../data/resourcesData';
import { resourceService } from '../services/resourceService';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'print' | 'download' | 'web'>('all');
  const [resources, setResources] = useState<(Resource & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await resourceService.getAllResources();
      setResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-6 h-6" />;
      case 'pdf':
        return <FileText className="w-6 h-6" />;
      case 'csv':
        return <Download className="w-6 h-6" />;
      case 'link':
        return <LinkIcon className="w-6 h-6" />;
    }
  };

  const getCategoryLabel = (category: Resource['category']) => {
    switch (category) {
      case 'print':
        return 'Print Resource';
      case 'download':
        return 'Free Download';
      case 'web':
        return 'Web Link';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent text-white rounded-lg p-3">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-heading text-primary">
              Resources
            </h1>
            <p className="text-text-light font-body">
              Explore helpful resources from G3 Ministries for personal and family worship
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-colors ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-background-dark text-text hover:bg-gray-200'
            }`}
          >
            All Resources
          </button>
          <button
            onClick={() => setSelectedCategory('print')}
            className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-colors ${
              selectedCategory === 'print'
                ? 'bg-primary text-white'
                : 'bg-background-dark text-text hover:bg-gray-200'
            }`}
          >
            Print Resources
          </button>
          <button
            onClick={() => setSelectedCategory('download')}
            className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-colors ${
              selectedCategory === 'download'
                ? 'bg-primary text-white'
                : 'bg-background-dark text-text hover:bg-gray-200'
            }`}
          >
            Free Downloads
          </button>
          <button
            onClick={() => setSelectedCategory('web')}
            className={`px-4 py-2 rounded-lg font-body text-sm font-semibold transition-colors ${
              selectedCategory === 'web'
                ? 'bg-primary text-white'
                : 'bg-background-dark text-text hover:bg-gray-200'
            }`}
          >
            Web Links
          </button>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="card hover:shadow-xl transition-shadow flex flex-col">
            {/* Cover Image */}
            {resource.coverImage && (
              <div className="mb-4 -mt-6 -mx-6 overflow-hidden rounded-t-lg bg-gray-100">
                <img
                  src={resource.coverImage}
                  alt={resource.title}
                  className="w-full h-64 object-contain"
                  loading="lazy"
                />
              </div>
            )}

            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                {getIcon(resource.type)}
                {getCategoryLabel(resource.category)}
              </span>
              {resource.price && (
                <span className="text-lg font-bold text-primary">
                  {resource.price}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-heading text-primary mb-3 line-clamp-2">
              {resource.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-text font-body mb-4 flex-grow line-clamp-4">
              {resource.description}
            </p>

            {/* Action Button */}
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 mt-auto"
            >
              {resource.type === 'book' ? (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  View Details
                </>
              ) : resource.type === 'pdf' || resource.type === 'csv' ? (
                <>
                  <Download className="w-4 h-4" />
                  Download
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  Visit Link
                </>
              )}
            </a>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="card bg-background-dark">
        <h3 className="text-lg font-heading text-primary mb-3">
          About These Resources
        </h3>
        <p className="text-sm text-text-light font-body mb-3">
          The TUNE MY HEART series provides resources for personal and family worship, including Bible reading aids,
          catechism, hymns, and more. These materials are designed to help individuals and families engage with
          Scripture, theology, and worship in meaningful ways throughout the year.
        </p>
        <p className="text-sm text-text-light font-body">
          Most of the resources are available for free download or in helpful print versions. All resources are
          created by Scott Aniol and published by G3 Ministries.
        </p>
      </div>
    </div>
  );
};

export default Resources;
