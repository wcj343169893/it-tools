<script lang="ts" setup>
import { NIcon, useThemeVars } from 'naive-ui';

import { RouterLink, useRoute } from 'vue-router';
import { Home2, Menu2, Moon, Sun } from '@vicons/tabler';

const route = useRoute();

import { storeToRefs } from 'pinia';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import { useStyleStore } from '@/stores/style.store';
import { config } from '@/config';
import type { ToolCategory } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0 ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }] : []),
  ...toolsByCategory.value,
]);

const showDrawer = ref(false);
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #header>
      <div class="header-inner">
        <div class="header-left">
          <c-button
            v-if="styleStore.isSmallScreen"
            circle
            variant="text"
            :aria-label="$t('home.toggleMenu')"
            @click="showDrawer = !showDrawer"
          >
            <NIcon size="25" :component="Menu2" />
          </c-button>

          <RouterLink to="/" class="brand">
            <span class="brand-title">IT-TOOLS</span>
          </RouterLink>

        </div>

        <div class="header-right">
          <command-palette />

          <locale-selector v-if="!styleStore.isSmallScreen" />

          <NavbarButtons />

          <c-button
            v-if="styleStore.isSmallScreen"
            circle
            variant="text"
            :aria-label="styleStore.isDarkTheme ? $t('home.nav.lightMode') : $t('home.nav.darkMode')"
            @click="styleStore.toggleDark()"
          >
            <NIcon size="22" :component="styleStore.isDarkTheme ? Sun : Moon" />
          </c-button>
        </div>
      </div>
    </template>

    <template #content>
      <!-- Mobile drawer -->
      <n-drawer v-model:show="showDrawer" placement="left" :width="280">
        <n-drawer-content>
          <template #header>
            <RouterLink to="/" class="drawer-brand" @click="showDrawer = false">
              IT-TOOLS
            </RouterLink>
          </template>
          <div class="drawer-menu">
            <CollapsibleToolMenu :tools-by-category="tools" @navigate="showDrawer = false" />
          </div>
        </n-drawer-content>
      </n-drawer>

      <div class="tool-nav" :class="{ 'hidden-mobile': styleStore.isSmallScreen }">
        <div v-if="!styleStore.isSmallScreen" class="horizontal-menu-wrapper">
          <RouterLink to="/" class="horizontal-trigger home-link" :class="{ active: route.path === '/' }">
            <NIcon size="18" :component="Home2" />
            <span>{{ $t('home.home') }}</span>
          </RouterLink>
          <CollapsibleToolMenu :tools-by-category="tools" horizontal />
        </div>
      </div>

      <slot />

      <div class="footer">
        <c-link :href="`https://github.com/zcq100/it-tools/tree/v${version}`">
          v{{ version }}
        </c-link>
      </div>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.brand {
  text-decoration: none;
  display: flex;
  align-items: center;

  .brand-title {
    font-size: 20px;
    font-weight: 700;
    color: v-bind('themeVars.primaryColor');
    letter-spacing: 1px;
  }
}

.header-nav {
  display: flex;
  align-items: center;
  margin-left: 24px;
}

.tool-nav {
  margin-bottom: 4px;
}

.horizontal-menu-wrapper {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
}

.home-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: v-bind('themeVars.textColor3');
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: v-bind('themeVars.dividerColor + "40"');
    color: v-bind('themeVars.textColor2');
  }

  &.active {
    background: v-bind('themeVars.primaryColor + "15"');
    color: v-bind('themeVars.primaryColor');
  }
}

.hidden-mobile {
  @media (max-width: 700px) {
    display: none;
  }
}

.drawer-brand {
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color, #1ea54c);
}

.drawer-menu {
  margin-top: 8px;
}

.footer {
  text-align: center;
  color: #94a3b8;
  padding: 12px 0 20px;
  font-size: 13px;
}
</style>
