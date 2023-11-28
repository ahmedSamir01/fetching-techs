import { Fragment } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import axios from "axios";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const InfiniteQueriesPage = () => {
  // data here contains a list of pages
  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchColors, {
    getNextPageParam: (_lastPage, pages) =>
      pages.length < 4 ? pages.length + 1 : undefined,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.data.map((color) => (
              <h2 key={color.id}>
                {color.id} {color.label}
              </h2>
            ))}
          </Fragment>
        ))}
        <div>
          <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
            Load more
          </button>
        </div>
        {/* only show when first fetch */}
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </>
  );
};
