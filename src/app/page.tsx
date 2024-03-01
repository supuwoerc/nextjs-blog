import Link from "next/link";
import { compareDesc, format, parseISO, startOfMonth } from "date-fns";
import { zhCN } from "date-fns/locale";
import { allPosts, Post } from "contentlayer/generated";
import { groupBy } from "lodash-es";
import classNames from "classnames";
import Navigate from "./components/navigate";
export interface PostCardProps {
  post: Post;
  current: boolean;
}
function PostCard({ post, current }: PostCardProps) {
  return (
    <Link
      href={post.url}
      className={classNames(
        "flex justify-between items-center",
        "text-catalogue leading-catalogue  transition-colors duration-300 dark:text-white ",
        "text-[clamp(14px,2vw,16px)]",
        {
          "hover:text-catalogue-hover": !current,
        }
      )}
    >
      <p
        className={classNames("max-w-[50%] truncate", {
          protrude: current,
          italic: current,
        })}
        title={post.title}
      >
        {post.title}
      </p>
      <hr className="border-dotted border-catalogue-line opacity-[0.25] flex-1 mx-[2px]  dark:border-d-catalogue-line" />
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
      <div className="flex items-center justify-between font-bold mt-[30px] mb-[4px] mx-0  text-[clamp(16px,1.8vw,24px)]">
        <span>{group.year}</span>
        <span>{group.month}</span>
      </div>
      {group.posts.length > 0
        ? group.posts.map((post, index) => {
            return <PostCard key={index} post={post} current={index === 0} />;
          })
        : null}
    </div>
  );
}

export default function Home() {
  const groupRet = groupBy(allPosts, (item) => {
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
    <div className="mx-auto max-w-xl py-8 px-[8px]">
      <Navigate />
      <div className="blog-roll">
        {keysSortRet.map((item) => {
          return <PostGroupCard key={item} {...getGroupInfo(item)} />;
        })}
      </div>
    </div>
  );
}
