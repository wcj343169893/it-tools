<script setup lang="ts">
import { useThemeVars } from 'naive-ui';

const themeVars = useThemeVars();
</script>

<template>
  <n-layout class="menu-layout">
    <n-layout-header bordered class="header">
      <slot name="header" />
    </n-layout-header>
    <n-layout class="content">
      <div class="content-inner">
        <slot name="content" />
      </div>
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
.header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  background: v-bind('themeVars.bodyColor');
}

.n-layout {
  min-height: 100vh;
}

.content {
  background: v-bind('themeVars.bodyColor');
  overflow: visible;

  ::v-deep(.n-layout-scroll-container) {
    padding: 26px;
    overflow: visible;
  }
}

.content-inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow: visible;
}
</style>
