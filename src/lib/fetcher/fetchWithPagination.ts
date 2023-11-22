import type { AxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';

import { fetcher } from './fetcher';

export type FetchWithPaginationProps = {
  url: string;
  page: number;
  size: number;
};

export const fetchWithPagination = ({
  url,
  page,
  size,
}: FetchWithPaginationProps) => {
  const token = getServerSession();

  const config: AxiosRequestConfig = {
    url,
    method: 'GET',
    params: { page, size },
    headers: { Authorization: `Bearer ${token}` },
  };
  fetcher(config).then((res) => res.data);
};
