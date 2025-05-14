import { useMemo, useState, type ChangeEvent } from "react";
import { useFetchPosts } from "../../../hooks/remote"
import styles from "./DashboardPage.module.css"
import { PostCard } from "../../components/cards";
import type { IPost } from "../../components/cards/PostCard/PostCard";
import { SearchForm } from "../../components/forms";
import { PostCardSkeleton } from "../../components/skeletons";

export type FilterOptions = "og_only" | "reshared_only" | "with_video_only" | "";

const DashboardPage = () => {
  const [page] = useState<number>(1);
  const [body, setBody] = useState({
    page: page,
    // sorting on total reaction count otherwise will have very recent post which most of the time have no activity
    sortBy: "total_reaction_count",
    keyword: "",
  });
  const [filter, setFilter] = useState<FilterOptions>("")

  const { isLoading, data, error } = useFetchPosts<{ items: IPost[] }>(
    `${import.meta.env.VITE_API_BASE_URL}/search-posts`,
    body
  );

  const top3EngagingPost = useMemo(() => {
    const items = (data as unknown as { items: IPost[] })?.items;
    return items?.slice(0, 3);
  }, [data]);

  const filteredPosts = useMemo(() => {
    const items = (data as unknown as { items: IPost[] })?.items;
    return items?.filter((post: IPost) => {
      switch (filter) {
        case "og_only":
          return !post.reposted;
        case "reshared_only":
          return post.resharedPost;
        case "with_video_only":
          return !!post.resharedPost?.video?.length;
        default:
          return true;
      }
    });
  }, [data, filter]);

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterOptions);
  };

  const handleSearchSubmit = (query: string) => {
    setBody(currBody => ({ ...currBody, keyword: query }));
  };

  const renderDashboardPosts = () => {
    if (isLoading) {
      return Array(4).fill(1).map(() => (
        <PostCardSkeleton />
      ));
    }
    if (!isLoading && error) {
      return (
        <p>Error occurred! Try later.</p>
      )
    }
    if (filteredPosts?.length) {
      return filteredPosts?.map((item: IPost) => (
        <PostCard post={item} key={item.urn} />
      ))
    }
    return <p>No Data Found</p>;
  };

  const renderTopEngagingPosts = () => {
    if (isLoading) {
      return Array(3).fill(1).map(() => (
        <PostCardSkeleton />
      ));
    }
    if (!isLoading && error) {
      return (
        <p>Error occurred! Try later.</p>
      );
    }
    if (top3EngagingPost?.length) {
      return top3EngagingPost?.map((item: IPost) => (
        <PostCard post={item} key={item.urn} />
      ));
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.postsSection}>
        <div className={styles.sectionHeader}>
          <SearchForm
            placeholder="Search post by author or keyword"
            searchQuery={body.keyword}
            onSearchSubmit={handleSearchSubmit}
          />
          <select
            className={styles.filter}
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">Choose Filter</option>
            <option value="og_only">Original Posts Only</option>
            <option value="reshared_only">Reshared Posts Only</option>
            <option value="with_video_only">Posts with Video</option>
          </select>
        </div>
        <div className={styles.flexVerticalList}>
          {renderDashboardPosts()}
        </div>
      </section>
      <aside className={styles.sideSection}>
        <h2>Most Engaging Posts</h2>
        <div className={styles.flexVerticalList}>
          {renderTopEngagingPosts()}
        </div>
      </aside>
    </main>
  );
};

export default DashboardPage;