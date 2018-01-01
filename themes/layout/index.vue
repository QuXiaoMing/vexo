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
