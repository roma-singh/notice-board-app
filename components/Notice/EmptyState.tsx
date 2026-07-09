import { FileX } from 'lucide-react';
import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <FileX size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No notices found</h3>
      <p className="text-gray-500 max-w-sm mb-6">
        There are currently no notices published on the board. Get started by creating the first one!
      </p>
      <Link
        href="/notice/add"
        className="px-6 py-2.5 font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
      >
        Publish Notice
      </Link>
    </div>
  );
}
