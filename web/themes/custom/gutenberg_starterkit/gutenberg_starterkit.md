# Gutenberg YAML Configuration Documentation

This documentation explains the purpose and usage of the `gutenberg.yml` configuration file. It is used to define client libraries, theme settings, custom blocks, experimental features, and styling for the Gutenberg editor.


## libraries-edit
Attach client libraries to the node edit page, where the editor is used. Useful for modifying the admin UI.

```yaml
  libraries-edit:
    - gutenberg_starter/editor
```
- `libraries-edit`: Specifies the libraries to be included.
- `gutenberg_starter/editor`: The library that enhances the editor UI.

## libraries-view
Attach client libraries to the node view page. Useful for adding JavaScript behaviors to custom blocks.

```yaml
  libraries-view:
   - gutenberg_starter/blocks
```
- `libraries-view`: Commented out by default. Uncomment to enable.
- `gutenberg_starter/blocks`: The library for custom blocks.

## custom-blocks
Define custom blocks, including their categories and configuration.

```yaml
custom-blocks:
  categories:
    - reference: text
      name: Text
      blocks:
        - id: text/factbox
          name: Factbox
```
- `categories`: Groups custom blocks by category.
 - `reference`: Category identifier (e.g., text).
 - `name`: Human-readable category name (e.g., Text).
- `blocks`: Defines individual blocks within the category.
 - `id`: Block identifier (e.g., text/factbox).
 - `name`: Block name (e.g., Factbox).

## theme-support
Configure theme-specific options, such as allowed file types, alignment, and layout support.

### Syntax
```yaml
theme-support:
  allowedMimeTypes:
    jpg|jpeg|jpe: image/jpeg
    png: image/png
    gif: image/gif
    mp3|m4a|m4b: audio/mpeg
    mov|qt: video/quicktime
    avi: video/avi
    wmv: video/x-ms-wmv
    mid|midi: audio/midi
    pdf: application/pdf
    mp4|m4v: video/mp4
    webm: video/webm
    ogv: video/ogg
    txt|asc|c|cc|h|srt: text/plain
    webp: image/webp

  alignWide: true
  supportsLayout: true
  __unstableIsBlockBasedTheme: true
  richEditingEnabled: true
  canLockBlocks: true
  imageDefaultSize: "original"
  maxWidth: 900
```
- `allowedMimeTypes`: Specifies supported file types for media uploads.
- `alignWide`: Enables wide and full alignment for blocks.
- `supportsLayout`: Enables layout-related settings.
- `__unstableIsBlockBasedTheme`: Enables block-based theme support (experimental).
- `richEditingEnabled`: Activates rich text editing in the block editor.
- `canLockBlocks`: Allows blocks to be locked in place.
- `imageDefaultSize`: Default size for uploaded images (e.g., original).
- `maxWidth`: Defines the maximum width for content blocks.

## enableCustomUnits
Specifies allowed units for custom dimensions in blocks (e.g., width, height, spacing).

```yaml
enableCustomUnits:
  - "%"
  - "px"
  - "em"
  - "rem"
  - "vh"
  - "vw"
```
- `enableCustomUnits`: List of supported CSS units for custom values.

## disableCustom... Flags
Enable or disable custom editor features, such as colors, font sizes, and spacing.

```yaml
disableCustomColors: false
disableCustomFontSizes: true
disableCustomGradients: false
disableCustomSpacingSizes: true
```
- `disableCustomColors`: Set to true to disable custom colors.
- `disableCustomFontSizes`: Set to true to disable custom font sizes.
- `disableCustomGradients`: Set to true to disable custom gradient options.
- `disableCustomSpacingSizes`: Set to true to disable custom spacing sizes.

## styles
Defines custom CSS files or inline styles to be applied to the editor.

```yaml
styles:
  - css:
      css/gutenberg-editor.css: {}
  - css: |-
      /* Inline CSS Example */
      .color-red {
        color: red;
      }
```
- `css`: Specifies a path to a CSS file or directly includes inline CSS.

## __experimentalFeatures
Defines advanced settings for spacing, layout, typography, and colors.

### Spacing
```yaml
spacing:
  blockGap: true
  units:
    - px
    - em
    - rem
    - "%"
  spacingSizes:
    theme:
      - name: 1
        size: 8px
        slug: 10
      - name: 2
        size: 16px
        slug: 20
```
- `blockGap`: Enables gap control between blocks.
- `units`: Supported units for spacing (e.g., px, %).
- `spacingSizes`: Defines custom spacing sizes for blocks.

## Layout
```yaml
layout:
  contentSize: 670px
  wideSize: 954px
```
- `contentSize`: Default content width.
- `wideSize`: Maximum width for wide-aligned blocks.

## Colors

```yaml
color:
  palette:
    theme:
      - name: Primary
        slug: primary
        color: "#FF0000"
      - name: Secondary
        slug: secondary
        color: "#00FF00"
```
- `palette`: Defines a custom color palette for blocks.

## Typography

```yaml
typography:
  fontSizes:
    theme:
      - name: Small
        size: "0.875rem"
        slug: small
      - name: Large
        size: "2rem"
        slug: large
```
- `fontSizes`: Defines custom font sizes for blocks.

## __experimentalBlockPatternCategories
Defines block pattern categories for prebuilt sections.

```yaml
__experimentalBlockPatternCategories:
  - label: Sections
    name: sections
```
- `label`: User-facing name of the category.
- `name`: Machine-readable name of the category.

## __experimentalBlockPatterns
Predefined block patterns for easy content creation.

```yaml
__experimentalBlockPatterns:
  - categories:
      - sections
    content: |-
      <!-- wp:heading -->
      <h1>Hello World</h1>
      <!-- /wp:heading -->
    description: "Simple heading block."
    name: gutenberg-starterkit/heading
    title: "Heading"
```
- `categories`: Specifies the category for the block pattern.
- `content`: The block content in HTML format.
- `description`: Description of the block pattern.
- `name`: Identifier for the block pattern.
- `title`: Display name of the block pattern.

## Block Patterns
Block patterns are predefined, reusable combinations of blocks.

### Block Pattern Categories
Defines categories for organizing block patterns.

```yaml
categories:
  - name: "Custom"
    label: "Custom Patterns"
  - name: "Media"
    label: "Media Patterns"
```

### Block Patterns Definition
Defines individual block patterns.

```yaml
patterns:
  - name: "hero-section"
    title: "Hero Section"
    description: "A full-width hero section with a heading and button."
    content: |
      <!-- wp:group -->
      <div class="wp-block-group">
        <h1>Welcome to My Website</h1>
        <button>Get Started</button>
      </div>
      <!-- /wp:group -->
```

To know more gutenberg supported attributes please visit https://developer.wordpress.org/block-editor/how-to-guides/themes/global-settings-and-styles/