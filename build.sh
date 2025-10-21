#!/bin/bash

# Script para build do app DataJud
set -e

echo "🔨 Building DataJud App..."

# Limpar build anterior
echo "🧹 Cleaning previous build..."
rm -rf dist/

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Compilar TypeScript
echo "⚙️ Compiling TypeScript..."
(
    cd "$(dirname "$0")"
    npx tsc
)

echo "✅ Build completed successfully!"
echo "📁 Output: dist/"
