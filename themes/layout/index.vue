<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="vexo-main">
      <div class="left">
        <slot name="main"></slot>
      </div>
      <div class="vexo-sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>
    <footer>
      <slot name="vexo-footer"></slot>
    </footer>
  </div>
</template>
