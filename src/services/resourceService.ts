import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Resource } from '../data/resourcesData';

export interface FirestoreResource extends Omit<Resource, 'id'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  order: number;
}

export const resourceService = {
  // Get all resources
  async getAllResources(): Promise<(Resource & { id: string })[]> {
    try {
      const q = query(collection(db, 'resources'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<FirestoreResource, 'createdAt' | 'updatedAt'>,
      })) as (Resource & { id: string })[];
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  // Add a new resource
  async addResource(resource: Omit<Resource, 'id'>): Promise<string> {
    try {
      const resourcesRef = collection(db, 'resources');
      const snapshot = await getDocs(resourcesRef);
      const maxOrder = snapshot.docs.reduce((max, doc) => {
        const data = doc.data();
        return Math.max(max, data.order || 0);
      }, 0);

      const docRef = await addDoc(resourcesRef, {
        ...resource,
        order: maxOrder + 1,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw error;
    }
  },

  // Update a resource
  async updateResource(id: string, updates: Partial<Omit<Resource, 'id'>>): Promise<void> {
    try {
      const resourceRef = doc(db, 'resources', id);
      await updateDoc(resourceRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  },

  // Delete a resource
  async deleteResource(id: string, coverImageUrl?: string): Promise<void> {
    try {
      // Delete cover image from storage if it exists and is in Firebase Storage
      if (coverImageUrl && coverImageUrl.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, coverImageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.error('Error deleting image:', error);
          // Continue with resource deletion even if image deletion fails
        }
      }

      const resourceRef = doc(db, 'resources', id);
      await deleteDoc(resourceRef);
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  },

  // Upload cover image
  async uploadCoverImage(file: File, resourceId: string): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const filename = `resources/${resourceId}_${timestamp}.${fileExtension}`;
      const storageRef = ref(storage, filename);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Update resource order
  async updateResourceOrder(resourceId: string, newOrder: number): Promise<void> {
    try {
      const resourceRef = doc(db, 'resources', resourceId);
      await updateDoc(resourceRef, {
        order: newOrder,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating resource order:', error);
      throw error;
    }
  },

  // Update multiple resources order
  async updateResourcesOrder(updates: Array<{ id: string; order: number }>): Promise<void> {
    try {
      const updatePromises = updates.map(({ id, order }) => {
        const resourceRef = doc(db, 'resources', id);
        return updateDoc(resourceRef, {
          order,
          updatedAt: Timestamp.now(),
        });
      });
      
      await Promise.all(updatePromises);
    } catch (error) {
      console.error('Error updating resources order:', error);
      throw error;
    }
  },
};
