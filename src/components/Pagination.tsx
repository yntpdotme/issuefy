'use client';

import {Button, Flex, Text} from '@radix-ui/themes';
import {useRouter, useSearchParams} from 'next/navigation';
import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from 'react-icons/hi2';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

export const Pagination = ({itemCount, pageSize, currentPage}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());

    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="3" as="span">
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronDoubleLeft className="size-5" />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronLeft className="size-5" />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronRight className="size-5" />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronDoubleRight className="size-5" />
      </Button>

      <Text size="2" weight="medium" ml="2">
        Page {currentPage} of {pageCount}
      </Text>
    </Flex>
  );
};
