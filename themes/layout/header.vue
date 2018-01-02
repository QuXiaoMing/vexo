<template>
<header class="top-nav-container">
  <nav class="top-nav">
    <router-link to="/" class="vertical-center nav-logo active" >
      <img src="../assets/img/logo.png" class="logo vertical-center-content" alt="">
      <span class="brand vertical-center-content">Shellming</span>
    </router-link>
    <ul class="nav-link-container">
      <li class="nav-link-item"><router-link class="nav-link" to="/tags">标签</router-link ></li>
      <li class="nav-link-item"><router-link class="nav-link" to="/me">关于我</router-link ></li>
    </ul> <img src="../assets/img/menu.png" alt="" class="menu-button">
  </nav>
</header>
</template>
