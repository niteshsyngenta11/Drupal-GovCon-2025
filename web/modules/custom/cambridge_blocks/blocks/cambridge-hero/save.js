import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const {
    backgroundImage,
    imageHeight,
    imageFocus,
  } = attributes;

  const blockProps = useBlockProps.save();

  const contentStyles = {
    minHeight: imageHeight,
    backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
    backgroundPosition: imageFocus,
    backgroundSize: 'cover',
    display: 'flex',
  };

  return (
    <div {...blockProps}>
      <div className="hero-content" style={contentStyles}>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
