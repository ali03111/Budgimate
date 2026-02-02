import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  deleteIncomeUrl,
  getAllIncomesUrl,
  setAsPrimaryIncomeUrl,
} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { useEffect, useRef, useState } from 'react';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';

const useAllIncomesScreen = () => {
  const [pages, setPages] = useState(0);
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['getAllIncomesUrl'],
    queryFn: async ({ pageParam = 1 }) => {
      // setPages(pageParam);
      return API.get(`${getAllIncomesUrl}${pageParam}`);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // Implement proper pagination logic here
      // Example: return lastPage.data.nextPage ?? undefined;
      return (pages?.length ?? 0) + 1;
    },
    // Consider adding staleTime and cacheTime options
  });
  console.log(
    'datadatadatadatadatadatadatadataskdjbvksdbvjksbvksbdkvbksdbvsbdjkvbsjdkbvsbvos',
    data?.pages?.flatMap(page => page?.data?.data),
  );
  const list = data?.pages?.flatMap(page => page?.data?.data) || [];

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return API.post(setAsPrimaryIncomeUrl + data, {});
    },
    onSuccess: async ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
        await refetch();
      } else {
        console.log('jkdsbkljsdbvklsdbvklsbklvsvd', data);
        errorMessage(data?.message);
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.delete(deleteIncomeUrl + data, {});
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklsdbvklsblkvbsdklbvksd', data);
      if (ok) {
        successMessage(data?.message);
        refetch();
      } else {
        errorMessage(data?.message);
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  const rowRefs = useRef(new Map()).current; // Store refs for each row
  const openRowKey = useRef(null); // Track currently open row
  const closeTimeout = useRef(null); // Track timeout

  // Auto-close after 2 seconds
  const autoCloseRow = rowKey => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    closeTimeout.current = setTimeout(() => {
      const rowRef = rowRefs.get(rowKey);
      if (rowRef) {
        rowRef.closeRow();
        openRowKey.current = null;
      }
    }, 2000); // 2 seconds
  };

  const onRowOpen = (rowKey, rowMap) => {
    // Close previously open row
    if (openRowKey.current && openRowKey.current !== rowKey) {
      const prevRowRef = rowRefs.get(openRowKey.current);
      if (prevRowRef) {
        prevRowRef.closeRow();
      }
    }

    // Set current open row
    openRowKey.current = rowKey;
    rowRefs.set(rowKey, rowMap[rowKey]);

    // Auto-close after delay
    autoCloseRow(rowKey);
  };

  const onRowClose = (rowKey, rowMap) => {
    setTimeout(() => {
      const rowRef = rowMap[rowKey];
      if (rowRef) rowRef.closeRow();
    }, 100); // tiny delay to show swipe
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  return {
    incomeSource: list,
    mutateAsync,
    deleteIcome: mutate,
    onRefresh: refetch,
    onRowOpen,
    onRowClose,
  };
};

export default useAllIncomesScreen;
