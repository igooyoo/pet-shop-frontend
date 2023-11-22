import { useEffect, useState } from 'react';

import { AdminLayout } from '@/components/common/AdminLayout';
import { Text } from '@/components/ui';
import { getReport } from '@/lib/api';

type Report = {
  total_saled: number;
  items: {
    name: string;
    quantity: number;
  }[];
};

const Index = () => {
  const [report, setReports] = useState<Report>();

  const fetchReports = async () => {
    const res = await getReport();
    const data = await res.data;
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="max-w-5xl">
      <Text variant="pageHeading">Статистик мэдээлэл</Text>
      <div>
        {/* <h1 className="text-xl">
          Нийт: <strong>{report?.total_saled}</strong>
        </h1> */}
        <div className="flex flex-wrap gap-5">
          {report?.items?.map((item) => (
            <div
              key={item.name}
              className="my-2 flex min-w-[250px] flex-col rounded-md bg-primary p-3 shadow-md"
            >
              <h1 className="text-lg font-bold">{item?.name}</h1>
              <h1>
                Зарагдсан тоо: <strong>{item?.quantity}</strong>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Index.Layout = AdminLayout;
export default Index;
