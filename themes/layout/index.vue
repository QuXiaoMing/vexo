<template>
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <div class="vexo-main">
    <div class="left">
      <slot></slot>
    </div>
    <div class="vexo-sidebar">
      <slot name="sidebar"></slot>
    </div>
  </div>
  <footer class="vexo-footer">
    <slot name="footer"></slot>
  </footer>
</div>
</template>
<style lang="scss">
.vexo-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 0;
  z-index: 1040;
  height: 100vh;
  width: 320px;
  box-shadow: inset 0 2px 6px #000;
  background: #222;
}
</style>
