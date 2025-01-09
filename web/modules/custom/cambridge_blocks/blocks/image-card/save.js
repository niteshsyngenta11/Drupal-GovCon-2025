import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { backgroundImage, buttonText, buttonLink } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <a href={buttonLink} className="image-card-button">
        {buttonText}
      </a>
    </div>
  );
}
