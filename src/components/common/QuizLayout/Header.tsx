import { useRouter } from 'next/router';

import { ChevronLeft } from '@/components/icons';
import { Button, Text } from '@/components/ui';

export const Heading = () => {
  const { push } = useRouter();

  return (
    <div className="absolute flex w-full items-center justify-center pt-3 backdrop-blur-sm">
      <Button
        variant="naked"
        className="absolute left-2 mb-2"
        onClick={() => push('/')}
      >
        <div className="text-base">
          <ChevronLeft />
        </div>
        <Text>Back</Text>
      </Button>
      <Text variant="pageHeading">Beautify</Text>
    </div>
  );
};
