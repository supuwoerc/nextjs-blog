import Link from "next/link";
import { compareDesc, format, parseISO, startOfMonth } from "date-fns";
import { zhCN } from "date-fns/locale";
import { allPosts, Post } from "contentlayer/generated";
import { groupBy } from "lodash-es";
import classNames from "classnames";
import Navigate from "./components/navigate";
import { layerConfig } from "@/config";
export interface PostCardProps {
  post: Post;
  isTop: boolean;
}
function PostCard({ post, isTop }: PostCardProps) {
  return (
    <Link
      href={post.url}
      className={classNames(
        "flex justify-between items-center",
        "text-catalogue leading-catalogue  transition-colors duration-300 dark:text-white ",
        "text-[clamp(14px,2vw,16px)]",
        {
          "hover:text-catalogue-hover": !isTop,
        }
      )}
    >
      <p
        className={classNames("max-w-[50%] truncate", {
          protrude: isTop,
          italic: isTop,
        })}
        title={post.title}
      >
        {post.title}
      </p>
      <hr className="border-dotted border-catalogue-line opacity-[0.25] flex-1 mx-[8px]  dark:border-d-catalogue-line" />
      <time dateTime={post.date}>{format(parseISO(post.date), "MM.dd")}</time>
    </Link>
  );
}
export interface PostGroup {
  year: string;
  month: string;
  posts: Post[];
}
function PostGroupCard(group: PostGroup) {
  return (
    <div className="post-group">
      <div className="flex items-center justify-between font-bold mb-[4px] mx-0  text-[clamp(16px,1.8vw,24px)]">
        <span>{group.year}</span>
        <span>{group.month}</span>
      </div>
      {group.posts.length > 0
        ? group.posts.map((post, index) => {
            return <PostCard key={index} post={post} isTop={post.top} />;
          })
        : null}
    </div>
  );
}

export default function Home() {
  const catalogue = allPosts.slice(0, layerConfig.catalogueSize);
  const groupRet = groupBy(catalogue, (item) => {
    return startOfMonth(parseISO(item.date)).getTime();
  });
  const keysSortRet = Object.keys(groupRet).sort((a, b) => {
    return Number(a) - Number(b);
  });
  const getGroupInfo = (key: string) => {
    const val = groupRet[key];
    const date = new Date(Number(key));
    return {
      year: format(date, "yyyy", { locale: zhCN }),
      month: format(date, "LLLL", { locale: zhCN }),
      posts: val.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
      ),
    };
  };
  return (
    <div className="px-[8px] w-full h-full relative overflow-y-auto">
      <div className="mx-auto max-w-xl">
        <div className="sticky top-0 py-8 pb-2 z-10 bg-white dark:bg-black">
          <Navigate />
        </div>
        <div className="blog-roll">
          {keysSortRet.map((item) => {
            return <PostGroupCard key={item} {...getGroupInfo(item)} />;
          })}
        </div>
      </div>
    </div>
  );
}
