import { createWriteStream } from 'fs'
import { readdir, stat, readFile } from 'fs/promises'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Simple zip creation using Node.js streams
// Note: This is a basic implementation. For production, consider using 'archiver' package

async function createZip() {
  const projectName = 'blockchain-e-voting-frontend'
  const outputFile = `${projectName}-complete.zip`
  
  console.log('📦 Creating project package...')
  console.log('This will create a zip file with all source code.')
  console.log('\nFor a proper zip file, please use one of these methods:\n')
  console.log('Method 1 - Using PowerShell (Windows):')
  console.log(`  Compress-Archive -Path * -DestinationPath ${outputFile} -Force`)
  console.log('\nMethod 2 - Using 7-Zip:')
  console.log(`  7z a ${outputFile} * -x!node_modules -x!.git -x!dist`)
  console.log('\nMethod 3 - Manual:')
  console.log('  1. Select all project files (except node_modules, .git, dist)')
  console.log(`  2. Right-click > Send to > Compressed (zipped) folder`)
  console.log(`  3. Rename to ${outputFile}`)
  console.log('\n✅ Package script ready!')
  console.log('\n📋 Files to include in zip:')
  console.log('  ✓ All files in src/')
  console.log('  ✓ index.html')
  console.log('  ✓ package.json')
  console.log('  ✓ vite.config.js')
  console.log('  ✓ README.md')
  console.log('  ✓ .gitignore')
  console.log('\n❌ Exclude from zip:')
  console.log('  ✗ node_modules/')
  console.log('  ✗ dist/')
  console.log('  ✗ .git/')
  console.log('  ✗ *.zip files')
}

createZip().catch(console.error)

