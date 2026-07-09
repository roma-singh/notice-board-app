import Link from 'next/link';
import { Notice } from '@prisma/client';
import { format } from 'date-fns';
import { Calendar, Tag, AlertCircle, Edit, Trash2 } from 'lucide-react';

interface NoticeCardProps {
  notice: Notice;
  onDeleteClick: (id: string) => void;
}

export default function NoticeCard({ notice, onDeleteClick }: NoticeCardProps) {
  const isUrgent = notice.priority === 'Urgent';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative group overflow-hidden">
      {isUrgent && (
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isUrgent
              ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
              : 'bg-gray-50 text-gray-600 ring-1 ring-gray-500/20'
            }`}>
            {isUrgent && <AlertCircle size={14} />}
            {notice.priority}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
            <Tag size={12} />
            {notice.category}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {notice.title}
      </h3>

      <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
        {notice.body}
      </p>

      {notice.image && (
        <div className="mb-4 rounded-xl overflow-hidden bg-gray-100 h-32 flex-shrink-0">
          <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center text-xs text-gray-500 font-medium">
          <Calendar size={14} className="mr-1.5 opacity-70" />
          {format(new Date(notice.publishDate), 'MMM d, yyyy')}
        </div>
        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Link
            href={`/notice/edit/${notice.id}`}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Notice"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={() => onDeleteClick(notice.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Notice"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
