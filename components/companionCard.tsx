'use client';

import { useState, useEffect } from 'react';
import { removeBookmark, addBookmark } from '@/lib/actions/companion.actions';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked: initialBookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  // Sync local state with prop on mount or prop change
  useEffect(() => {
    setIsBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  const handleBookmark = async () => {
    setIsLoading(true);
    const previousState = isBookmarked;

    // Optimistically update the UI
    setIsBookmarked(!isBookmarked);

    try {
      if (isBookmarked) {
        await removeBookmark(id, pathname);
        console.log(`Bookmark removed for companion ID: ${id}`);
      } else {
        await addBookmark(id, pathname);
        console.log(`Bookmark added for companion ID: ${id}`);
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      // Revert to previous state on error
      setIsBookmarked(previousState);
      console.log('Failed to update bookmark. Reverted to previous state.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button
          className="companion-bookmark"
          onClick={handleBookmark}
          disabled={isLoading}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Image
            src={
              isBookmarked
                ? '/icons/bookmark-filled.svg'
                : '/icons/bookmark.svg'
            }
            alt={isBookmarked ? 'Bookmarked' : 'Bookmark'}
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;