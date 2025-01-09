import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { backgroundImage, buttonText, buttonLink } = attributes;

  const blockProps = useBlockProps();

  const onSelectImage = (media) => {
    setAttributes({ backgroundImage: media.url });
  };

  const onRemoveImage = () => {
    setAttributes({ backgroundImage: '' });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Image Settings')}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={backgroundImage}
              render={({ open }) => (
                <Button onClick={open} isSecondary>
                  {__('Select Background Image')}
                </Button>
              )}
            />
          </MediaUploadCheck>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setAttributes({ buttonText: e.target.value })}
            placeholder={__('Button Text')}
          />
          <input
            type="url"
            value={buttonLink}
            onChange={(e) => setAttributes({ buttonLink: e.target.value })}
            placeholder={__('Button Link')}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} style={{ backgroundImage: `url(${backgroundImage})` }}>
        {backgroundImage ? (
          <a href={buttonLink} className="image-card-button">
            {buttonText}
          </a>
        ) : (
          <div className="image-placeholder">
            {__('Select an image to display')}
          </div>
        )}
        {backgroundImage && (
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
        )}
      </div>
    </>
  );
}
