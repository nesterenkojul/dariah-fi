import React from 'react'
import type { TrainingSectionsBlock as TrainingSectionsBlockProps } from '@/payload-types'

export const TrainingSectionsBlockComponent: React.FC<TrainingSectionsBlockProps> = ({
  heading,
  intro,
  groups,
}) => {
  return (
    <div className="container my-8">
      <h2 className="text-2xl font-semibold mb-2">{heading}</h2>
      {intro && <p className="mb-6 text-muted-foreground">{intro}</p>}
      
      {groups?.map((group, i) => (
        <div key={i} className="mb-6">
          {group.levelLabel && (
            <h3 className="text-lg font-medium mb-3">{group.levelLabel}</h3>
          )}

          <div className="space-y-4">
            {group.courses?.map((course, j) => (
              <div key={j} className="border rounded-lg p-4">
                {course.url ? (
                <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold underline"
                  >
                    {course.title}
                  </a>
                ) : (
                  <p className="font-semibold">{course.title}</p>
                )}

                {course.description && (
                  <p className="text-sm mt-1 text-muted-foreground">{course.description}</p>
                )}

                {course.levelTags && (
                  <p className="text-xs mt-2 uppercase tracking-wide text-primary">
                    {course.levelTags}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}