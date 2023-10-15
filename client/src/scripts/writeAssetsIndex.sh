#!/bin/bash

# This script generates an index file for the assets/ directory.
# It writes import statements & makes image objects for each image file in
# the responsive/ directory of each subdirectory (subdirs var) within the assets directory.
# It also generates a default export that contains the subdirectory objects.

# Example: assets/bar/responsive/bar_server_01_full.webp becomes
#  bar: {
#    bar_server_01: {
#      small: bar_server_01_small,
#      480w: bar_server_01_480w,
#      600w: bar_server_01_600w,
#      full: bar_server_01_full,
#    }, ...

# Subdirectories to traverse
subdirs=("bar" "drinks" "drinkware")

# Define the source directory
src_base_dir="src/assets"

# Define the output directory for import statements and image objects
output_dir="src/assets"
output_file="$output_dir/index.ts"

# Initialize the import statements and image objects
import_statements=""
image_objects=""

# Iterate through each subdirectory
for subdir in "${subdirs[@]}"; do
  src_dir="$src_base_dir/$subdir/responsive"

  # Check if the source directory exists
  if [ -d "$src_dir" ]; then
    # Create an empty object for this subdirectory
    image_objects+="export const ${subdir} = {\n"

    # Iterate through each image file in the responsive directory with the -full suffix
    for full_image_file in "$src_dir"/*_full.webp; do
      # Extract the image name without extension
      full_image_name=$(basename -- "$full_image_file")
      base_image_name="${full_image_name%_full.webp}"

      # Generate import statements for all image sizes
      import_statements+="import ${base_image_name}_80w from \"@/assets/${subdir}/responsive/${base_image_name}_80w.webp\";\n"
      import_statements+="import ${base_image_name}_320w from \"@/assets/${subdir}/responsive/${base_image_name}_320w.webp\";\n"
      import_statements+="import ${base_image_name}_480w from \"@/assets/${subdir}/responsive/${base_image_name}_480w.webp\";\n"
      import_statements+="import ${base_image_name}_600w from \"@/assets/${subdir}/responsive/${base_image_name}_600w.webp\";\n"
      import_statements+="import ${base_image_name}_full from \"@/assets/${subdir}/responsive/${base_image_name}_full.webp\";\n"

      # Generate image objects for each image size within the subdirectory object
      image_objects+="  ${base_image_name}: {\n"
      image_objects+="    '80w': ${base_image_name}_80w,\n"
      image_objects+="    '320w': ${base_image_name}_320w,\n"
      image_objects+="    '480w': ${base_image_name}_480w,\n"
      image_objects+="    '600w': ${base_image_name}_600w,\n"
      image_objects+="    'full': ${base_image_name}_full,\n"
      image_objects+="  },\n"
    done

    # Close the subdirectory object
    image_objects+="};\n\n"
  else
    echo "Directory not found: $src_dir"
  fi
done

# Create a default export that contains the subdirectory objects
default_export="export default {\n"
for subdir in "${subdirs[@]}"; do
  default_export+="  ${subdir},\n"
done
default_export+="};"

# Write the generated import statements, image objects, and default export to the output file
echo -e "$import_statements\n$image_objects$default_export" >"$output_file"

echo "Import statements, image objects, and default export generation completed. Check $output_file."
