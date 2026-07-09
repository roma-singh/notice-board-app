import axios from 'axios';
import { NoticeFormData } from './validation';
import { Notice } from '@prisma/client';

const API = axios.create({
  baseURL: '/api',
});

export const getNotices = async (): Promise<Notice[]> => {
  const { data } = await API.get('/notices');
  return data;
};

export const getNotice = async (id: string): Promise<Notice> => {
  const { data } = await API.get(`/notices/${id}`);
  return data;
};

export const createNotice = async (noticeData: NoticeFormData): Promise<Notice> => {
  const { data } = await API.post('/notices', noticeData);
  return data;
};

export const updateNotice = async (id: string, noticeData: NoticeFormData): Promise<Notice> => {
  const { data } = await API.put(`/notices/${id}`, noticeData);
  return data;
};

export const deleteNotice = async (id: string): Promise<void> => {
  await API.delete(`/notices/${id}`);
};
