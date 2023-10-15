#!/bin/bash

# This script uses imagemagick to convert images to WebP format and generates multiple sizes for responsive images.
# It ignores images in the root directory of the source directory. It only converts images in subdirectories.
# Generated images are placed in a 'responsive' folder in the same directory as the source image.

src_dir="src/assets/"
file_ext="webp"
quality="80"

cd $src_dir

# Image conversion functions
resizeThumbnail() {
  convert "$1" -strip -resize 80x80 -quality "$quality" "$2_80w.$file_ext"
}

resizeSmall() {
  convert "$1" -strip -resize 320 -quality "$quality" "$2_320w.$file_ext"
}

resizeMedium() {
  convert "$1" -strip -resize 480 -quality "$quality" "$2_480w.$file_ext"
}

resizeLarge() {
  convert "$1" -strip -resize 600 -quality "$quality" "$2_600w.$file_ext"
}

fullSize() {
  convert "$1" -strip -resize 1300 -quality "$quality" "$2_full.$file_ext"
}

# Delete all 'responsive' and 'full_size' folders
find . -type d -name 'responsive' -exec rm -rf {} +
find . -type d -name 'full_size' -exec rm -rf {} +

# Recursively find all image files in the source directory and its subdirectories
for file in $(find ${DIR} -iregex ".*\.\(jpg\|gif\|png\|jpeg\)"); do
  # Get file name without extension
  filename=$(basename -- "$file")
  filename_noext="${filename%.*}"

  # Define the output directory paths with WebP extension
  base_path="$(dirname "$(dirname "$file")")"
  responsive_output_path="$base_path/responsive"

  # Skip file when it is not located in a subdirectory of the source directory
  if [[ "$base_path" == "." ]]; then
    continue
  fi

  # Create output directories if they don't exist
  mkdir -p "$responsive_output_path"

  # Resize and convert the image to WebP format
  resizeThumbnail "$file" "$responsive_output_path/$filename_noext"
  resizeSmall "$file" "$responsive_output_path/$filename_noext"
  resizeMedium "$file" "$responsive_output_path/$filename_noext"
  resizeLarge "$file" "$responsive_output_path/$filename_noext"
  fullSize "$file" "$responsive_output_path/$filename_noext"

  # Check if the conversion was successful
  if [ $? -eq 0 ]; then
    echo "Generated images for: $file"
  else
    echo "Error generating: $file"
  fi
done

echo "Image processing completed."
