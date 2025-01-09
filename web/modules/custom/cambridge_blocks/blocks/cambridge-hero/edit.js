import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  InnerBlocks,
} from '@wordpress/block-editor';
import {
  PanelBody,
  RangeControl,
  Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundImage,
    imageHeight,
    imageFocus
  } = attributes;

  const blockProps = useBlockProps();

  const contentStyles = {
    minHeight: imageHeight,
    backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
    backgroundPosition: imageFocus,
    backgroundSize: 'cover',
    display: 'flex',
  };

  const onSelectImage = (media) => {
    if (!media || !media.url) {
      setAttributes({ backgroundImage: {} });
      return;
    }
    setAttributes({
      backgroundImage: {
        url: media.url,
        id: media.id,
        alt: media.alt,
      },
    });
  };

  const onRemoveImage = () => {
    setAttributes({ backgroundImage: {} });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Image Settings')}>
          <RangeControl
            label={__('Height')}
            value={imageHeight}
            onChange={(value) => setAttributes({ imageHeight: value })}
            min={200}
            max={1000}
            step={10}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {!backgroundImage?.url ? (
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={backgroundImage?.id}
              render={({ open }) => (
                <Button
                  onClick={open}
                  variant="secondary"
                  className={!backgroundImage?.url ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
                >
                  {!backgroundImage?.url ? __('Add background image') : __('Replace image')}
                </Button>
              )}
            />
          </MediaUploadCheck>
        ) : (
          <div className="hero-content" style={contentStyles}>
            <Button
              className="remove-image-button"
              onClick={onRemoveImage}
              variant="secondary"
              isSmall
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 1,
              }}
            >
              {__('Remove image')}
            </Button>


            <div className="hero-title-group">
              <InnerBlocks
                allowedBlocks={['core/group', 'core/heading', 'core/paragraph']}
                template={[
                  [
                    'core/group',
                    {},
                    [
                      ['core/heading', { placeholder: 'Add a heading...' }],
                      ['core/paragraph', { placeholder: 'Add a description...' }]
                    ]
                  ]
                ]}
                templateLock="all"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
