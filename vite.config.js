const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        crows: resolve(__dirname, './crows.html'),
        cart: resolve(__dirname, './cart.html'),
        accessories: resolve(__dirname, './accessories.html')
      }
    }
  }
});