import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout/Layout';
import NoticeForm from '../../../components/Notice/NoticeForm';
import LoadingSpinner from '../../../components/Notice/LoadingSpinner';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getNotice } from '../../../lib/api';
import { Notice } from '@prisma/client';
import toast from 'react-hot-toast';

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNoticeData = useCallback(async (noticeId: string) => {
    setIsLoading(true);
    try {
      const data = await getNotice(noticeId);
      setNotice(data);
    } catch (error) {
      console.error('Failed to fetch notice:', error);
      toast.error('Failed to fetch notice data');
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchNoticeData(id);
    }
  }, [id, fetchNoticeData]);

  return (
    <Layout title="Edit Notice - Notice Board">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 tracking-tight">Edit Notice</h1>
          <p className="text-gray-500 mt-1">Make changes to the notice and update the board.</p>
        </div>
        
        {isLoading ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : notice ? (
          <NoticeForm initialData={notice} isEditing={true} />
        ) : null}
      </div>
    </Layout>
  );
}
