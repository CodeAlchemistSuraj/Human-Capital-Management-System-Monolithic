#!/bin/bash

# Define the output file name
OUTPUT_FILE="DIRECTORY_TREE_DOCUMENTATION.txt"

# --- Script Start ---

echo "Starting directory tree generation..."

# 1. Clear any previous file and write the header
echo "Project Directory Tree (Generated on $(date))" > $OUTPUT_FILE
echo "------------------------------------------------------" >> $OUTPUT_FILE

# 2. Use 'find' to list all files and directories starting from the current location (.), 
#    and pipe the output into the text file.

# The find command arguments:
# .          -> Start search from the current directory
# -print     -> Print the full file path.
# -exec echo -> This part is sometimes used for formatting, but plain find is simplest.

# Note: The output format will be a simple path list, which is standard for cross-platform reliability.
# Example format:
# .
# ./file1.txt
# ./src
# ./src/index.js
# ./src/components
# ./src/components/Button.jsx

find . -print | sort >> $OUTPUT_FILE

# The following is an alternative using a custom function for better visual formatting
# (requires more complex parsing, but looks like the 'tree' command)
: '
# Alternative approach for a visual tree (requires more scripting/tooling)
# For a visual tree similar to the 'tree' command, you might use:
# find . -print | sed -e "s;[^/]*/*; |;g" -e "s; |$; -;g" -e "s;\\( |\\)* | -;\\1-;" >> $OUTPUT_FILE
'

# 3. Confirmation
echo "------------------------------------------------------" >> $OUTPUT_FILE
echo "Directory tree successfully created!"
echo "Output saved to: $PWD/$OUTPUT_FILE"

# Display the size of the generated file
echo "File size: $(du -h $OUTPUT_FILE | awk '{print $1}')"

# --- Script End ---