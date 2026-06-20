export function toRichText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            { type: 'text', version: 1, text, format: 0, mode: 'normal', style: '', detail: 0 },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}


type RichNode =
  | { type: 'h2' | 'h3' | 'h4'; text: string }
  | { type: 'p'; text: string }
  | { type: 'image'; mediaId: number }
  | { type: 'linkParagraph'; text: string; url: string }

export function toRichTextBlocks(nodes: RichNode[]) {
  return {
    root: {
      type: 'root',
      children: nodes.map((node) => {
        if (node.type === 'p') {
          return {
            type: 'paragraph',
            version: 1,
            children: [
              { type: 'text', version: 1, text: node.text, format: 0, mode: 'normal', style: '', detail: 0 },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
          }
        }

        if (node.type === 'linkParagraph') {
          return {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'link',
                version: 1,
                fields: {
                  url: node.url,
                  newTab: false,
                  linkType: 'custom',
                },
                children: [
                  { type: 'text', version: 1, text: node.text, format: 0, mode: 'normal', style: '', detail: 0 },
                ],
                direction: 'ltr' as const,
                format: '' as const,
                indent: 0,
              },
            ],
            direction: 'ltr' as const,
            format: '' as const,
            indent: 0,
          }
        }

        if (node.type === 'image') {
          return {
            type: 'upload',
            version: 1,
            relationTo: 'media',
            value: node.mediaId,
            fields: {},
            format: '' as const,
          }
        }

        // heading
        return {
          type: 'heading',
          tag: node.type,
          version: 1,
          children: [
            { type: 'text', version: 1, text: node.text, format: 0, mode: 'normal', style: '', detail: 0 },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
        }
      }),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}