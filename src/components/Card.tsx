import type { ReactNode } from 'react';
import { twMerge as tm } from 'tailwind-merge';

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({children, className}: CardProps) {
  return <div className={tm("space-y-5 py-2 px-4 mb-5 bg-gray-400/10 rounded-lg", className)}>{children}</div>
}
