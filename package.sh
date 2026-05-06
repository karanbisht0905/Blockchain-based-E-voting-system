#!/bin/bash
# Bash script to package the project (Linux/Mac)
# Run with: chmod +x package.sh && ./package.sh

PROJECT_NAME="blockchain-e-voting-frontend"
OUTPUT_FILE="${PROJECT_NAME}-complete.zip"

echo "📦 Creating project package..."
echo ""

# Remove existing zip if it exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
    echo "Removed existing zip file"
fi

# Create zip excluding node_modules, .git, dist, and zip files
zip -r "$OUTPUT_FILE" . \
    -x "node_modules/*" \
    -x ".git/*" \
    -x "dist/*" \
    -x "*.zip" \
    -x ".vscode/*" \
    -x ".idea/*" \
    -x "*.log" \
    > /dev/null

if [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo ""
    echo "✅ Package created successfully!"
    echo "📁 File: $OUTPUT_FILE"
    echo "📊 Size: $FILE_SIZE"
    echo ""
    echo "The package includes all source code ready for distribution."
else
    echo "❌ Error creating package"
    exit 1
fi

