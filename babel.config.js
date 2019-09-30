module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // babel-plugin-equire：按需加载echarts
    "equire",
    // babel-plugin-component：按需加载element-ui
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
  ]
}
