import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useSearchParams } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';

export const CATEGORIES = [
  {
    id: 1,
    category: 'PitchSmashers',
  },
  {
    id: 2,
    category: 'Festivals',
  },
  {
    id: 3,
    category: 'Outsites',
  },
  {
    id: 4,
    category: 'Townhall',
  },
  {
    id: 5,
    category: 'DIY',
  },
];

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) {
      return;
    }

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', updateScrollButtons);
    updateScrollButtons();
  }, [emblaApi, updateScrollButtons]);

  const handleCategoryChange = category => {
    if (searchParams.get('cat') !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
      cat: category,
      });
    }
  };

  return (
    <div className="relative">
      <div
        className="overflow-hidden mask-linear-from-neutral-500 md:flex md:flex-row items-center justify-between"
        ref={emblaRef}
      >
        <div className="flex pt-8 pb-8">
          {CATEGORIES.map(category => (
            <div
              key={category.id}
              className="flex-1 flex items-center justify-between flex-wrap mx-2 "
            >
              <Link
                className="bg-gray-300 rounded-full px-4 py-2 hover:bg-gray-500 hover:text-white"
                onClick={() => handleCategoryChange(category.category)}
              >
                {category.category}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/*Navigation Buttons*/}
      <button
        className={`arrow-btn -left-3  ${
          !canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        disabled={!canScrollPrev}
      >
        <IoIosArrowForward className="rotate-180" />
      </button>

      <button
        className={`arrow-btn -right-3  ${
          !canScrollNext ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => emblaApi && emblaApi.scrollNext()}
        disabled={!canScrollNext}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Categories;
