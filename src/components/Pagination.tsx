import {Button, Flex, Text} from '@radix-ui/themes';
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
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="3" p="3">
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === 1}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronDoubleLeft className="size-5" />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === 1}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronLeft className="size-5" />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === pageCount}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronRight className="size-5" />
      </Button>
      <Button
        color="gray"
        variant="ghost"
        disabled={currentPage === pageCount}
        className="cursor-pointer rounded-full p-2"
      >
        <HiMiniChevronDoubleRight className="size-5" />
      </Button>

      <Text size="2" weight="bold" ml="2">
        Page {currentPage} of {pageCount}
      </Text>
    </Flex>
  );
};
