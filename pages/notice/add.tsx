import Layout from '../../components/Layout/Layout';
import NoticeForm from '../../components/Notice/NoticeForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AddNotice() {
  return (
    <Layout title="Add Notice - Notice Board">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 tracking-tight">Create New Notice</h1>
          <p className="text-gray-500 mt-1">Fill out the information below to publish a new notice to the board.</p>
        </div>
        
        <NoticeForm />
      </div>
    </Layout>
  );
}
