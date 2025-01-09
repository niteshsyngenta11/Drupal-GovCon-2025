import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
} from '@wordpress/block-editor';

export default function Edit() {
  const blockProps = useBlockProps();

  return (
    <>
      <div {...blockProps}>
        <InnerBlocks
          allowedBlocks={['core/columns']}
          template={[
            [
              'core/columns',
              {},
              [
                [
                  'core/column',
                  { className: 'left-column' },
                  [
                    ['core/paragraph', { placeholder: 'Left column content...' }],
                    [
                      'core/buttons',
                      {},
                      [
                        ['core/button', { text: 'Button 1' }],
                        ['core/button', { text: 'Button 2' }]
                      ]
                    ]
                  ]
                ],
                [
                  'core/column',
                  { className: 'right-column' },
                  [
                    ['core/paragraph', { placeholder: 'Right column content...' }],
                    [
                      'core/buttons',
                      {},
                      [
                        ['core/button', { text: 'Button 1' }],
                        ['core/button', { text: 'Button 2' }]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]}
          templateLock="all"
        />
      </div>
    </>
  );
}
