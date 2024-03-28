import { layerConfig } from '@/config';
import classNames from 'classnames';
import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc, format, parseISO, startOfMonth } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { groupBy } from 'lodash-es';
import Link from 'next/link';

export interface PostCardProps {
  post: Post;
  isTop: boolean;
}
export function PostCard({ post, isTop }: PostCardProps) {
  return (
    <Link
      href={post.url}
      className={classNames(
        'flex items-center justify-between',
        'leading-catalogue text-catalogue  transition-colors duration-300 dark:text-white ',
        'text-[clamp(14px,2vw,16px)]',
        {
          'hover:text-catalogue-hover': !isTop,
        }
      )}
    >
      <p
        className={classNames('max-w-[50%] truncate', {
          protrude: isTop,
          italic: isTop,
        })}
        title={post.title}
      >
        {post.title}
      </p>
      <hr className="mx-[8px] flex-1 border-dotted border-catalogue-line opacity-[0.25]  dark:border-d-catalogue-line" />
      <time dateTime={post.date}>{format(parseISO(post.date), 'MM.dd')}</time>
    </Link>
  );
}
export interface PostGroup {
  year: string;
  showYear: boolean;
  showMonth: boolean;
  month: string;
  posts: Post[];
}
export function PostGroupCard(group: PostGroup) {
  return (
    <div className="post-group">
      <div className="mx-0 mb-[8px] flex items-baseline justify-between text-[clamp(16px,1.8vw,24px)]  font-bold">
        <span>{group.showYear ? group.year : ''}</span>
        <span className="text-[16px]">{group.month}</span>
      </div>
      {group.posts.length > 0
        ? group.posts.map((post, index) => {
            return <PostCard key={index} post={post} isTop={post.top} />;
          })
        : null}
    </div>
  );
}
export default function Catalogue() {
  const catalogue = allPosts.slice(0, layerConfig.catalogueSize);
  const groupRet = groupBy(catalogue, (item) => {
    return startOfMonth(parseISO(item.date)).getTime();
  });
  const keysSortRet = Object.keys(groupRet).sort((a, b) => {
    return Number(b) - Number(a);
  });
  const yearRecord: Record<string, boolean> = {};
  const getGroupInfo = (key: string) => {
    const val = groupRet[key];
    const date = new Date(Number(key));
    const year = format(date, 'yyyy', { locale: zhCN });
    const ret: PostGroup = {
      year,
      month: format(date, 'LLLL', { locale: zhCN }),
      showYear: !(yearRecord[year] ?? false),
      showMonth: val.length > 1,
      posts: val.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
      ),
    };
    yearRecord[year] = true;
    return ret;
  };
  return (
    <div className="blog-roll">
      {keysSortRet.map((item) => {
        return <PostGroupCard key={item} {...getGroupInfo(item)} />;
      })}
    </div>
  );
}
