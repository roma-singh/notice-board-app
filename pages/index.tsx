import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import NoticeCard from '../components/Notice/NoticeCard';
import EmptyState from '../components/Notice/EmptyState';
import LoadingSpinner from '../components/Notice/LoadingSpinner';
import DeleteDialog from '../components/Notice/DeleteDialog';
import { getNotices, deleteNotice } from '../lib/api';
import { Notice } from '@prisma/client';
import toast from 'react-hot-toast';

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; id: string | null }>({
    isOpen: false,
    id: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchNotices = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getNotices();
      setNotices(data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      toast.error('Failed to fetch notices');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleDeleteClick = (id: string) => {
    setDeleteDialog({ isOpen: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id) return;
    
    setIsDeleting(true);
    try {
      await deleteNotice(deleteDialog.id);
      setNotices((prev) => prev.filter((notice) => notice.id !== deleteDialog.id));
      toast.success('Notice deleted successfully');
      setDeleteDialog({ isOpen: false, id: null });
    } catch (error) {
      console.error('Failed to delete notice:', error);
      toast.error('Failed to delete notice');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Layout title="Notice Board - Dashboard">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Recent Notices</h1>
          <p className="text-gray-500 mt-1">Stay updated with the latest information</p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : notices.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <NoticeCard 
              key={notice.id} 
              notice={notice} 
              onDeleteClick={handleDeleteClick} 
            />
          ))}
        </div>
      )}

      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => !isDeleting && setDeleteDialog({ isOpen: false, id: null })}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </Layout>
  );
}
