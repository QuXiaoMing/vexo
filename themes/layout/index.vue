<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="main">
      <div class="left">
        <slot name="main"></slot>
      </div>
      <div class="sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
