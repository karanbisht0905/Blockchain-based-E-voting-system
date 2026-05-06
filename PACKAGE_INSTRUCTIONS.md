# 📦 Packaging Instructions

This guide will help you create a downloadable zip file of the Blockchain E-Voting Frontend project.

## Quick Package (Choose Your OS)

### Windows (PowerShell)
```powershell
npm run package:win
```
Or run directly:
```powershell
powershell -ExecutionPolicy Bypass -File package.ps1
```

### Linux/Mac (Bash)
```bash
npm run package:unix
```
Or run directly:
```bash
chmod +x package.sh && ./package.sh
```

### Manual Method (All Platforms)

1. **Select all project files** (except the following):
   - ✅ Include: `src/`, `index.html`, `package.json`, `vite.config.js`, `README.md`, `.gitignore`, etc.
   - ❌ Exclude: `node_modules/`, `dist/`, `.git/`, `*.zip` files

2. **Create zip file:**
   - **Windows**: Right-click selected files → Send to → Compressed (zipped) folder
   - **Mac**: Right-click → Compress Items
   - **Linux**: Use file manager or `zip -r project.zip . -x "node_modules/*" ".git/*"`

3. **Rename** the zip file to: `blockchain-e-voting-frontend-complete.zip`

## What's Included in the Package

✅ **Source Code:**
- All React components and pages
- CSS styling files
- Configuration files
- Documentation

✅ **Configuration:**
- `package.json` - Dependencies and scripts
- `vite.config.js` - Build configuration
- `.gitignore` - Git ignore rules

✅ **Documentation:**
- `README.md` - Project documentation
- `PACKAGE_INSTRUCTIONS.md` - This file

## What's Excluded

❌ **Build artifacts:**
- `node_modules/` - Dependencies (install with `npm install`)
- `dist/` - Production build (create with `npm run build`)

❌ **Version control:**
- `.git/` - Git repository data

❌ **IDE files:**
- `.vscode/`, `.idea/` - Editor settings

## After Downloading/Receiving the Package

1. **Extract** the zip file
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

## File Size

The packaged project should be approximately **50-200 KB** (without node_modules).

## Distribution

The packaged zip file can be:
- Shared via email
- Uploaded to cloud storage
- Distributed via USB drive
- Hosted on a file sharing service

---

**Note:** Recipients will need to run `npm install` to install dependencies before using the project.

