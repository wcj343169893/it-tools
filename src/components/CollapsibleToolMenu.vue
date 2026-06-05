<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[]; horizontal?: boolean }>(), {
  toolsByCategory: () => [],
  horizontal: false,
});
const emit = defineEmits<{ navigate: [] }>();
const { toolsByCategory, horizontal } = toRefs(props);
const route = useRoute();

const makeLabel = (tool: Tool) => () => h(RouterLink, { to: tool.path, onClick: () => emit('navigate') }, { default: () => tool.name });
const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function toggleCategoryCollapse({ name }: { name: string }) {
  collapsedCategories.value[name] = !collapsedCategories.value[name];
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name],
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
      toolName: tool.name,
      rawIcon: tool.icon,
    })),
  })),
);

const themeVars = useThemeVars();

function isCategoryActive(name: string): boolean {
  return menuOptions.value
    .find(c => c.name === name)
    ?.tools.some(t => t.key === route.path) ?? false;
}

const openCategory = ref<string | null>(null);
const panelStyle = ref<Record<string, string>>({});
let closeTimer: ReturnType<typeof setTimeout> | null = null;

function onCategoryEnter(name: string, e: MouseEvent) {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  openCategory.value = name;
  const trigger = e.currentTarget as HTMLElement;
  const rect = trigger.getBoundingClientRect();
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
  };
}
function onCategoryLeave() {
  closeTimer = setTimeout(() => { openCategory.value = null; }, 200);
}
function onPanelEnter() {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
}
function onPanelLeave() {
  openCategory.value = null;
}
</script>

<template>
  <!-- Horizontal mode -->
  <div v-if="horizontal" class="horizontal-menu">
    <div
      v-for="{ name, tools } of menuOptions"
      :key="name"
      class="horizontal-category"
      @mouseleave="onCategoryLeave()"
    >
      <div
        class="horizontal-trigger"
        :class="{ active: isCategoryActive(name), open: openCategory === name }"
        @mouseenter="onCategoryEnter(name, $event)"
      >
        <span>{{ name }}</span>
        <span class="trigger-arrow" :class="{ flipped: openCategory === name }">
          <icon-mdi-chevron-down />
        </span>
      </div>
      <Teleport to="body">
        <div
          v-show="openCategory === name"
          class="dropdown-panel"
          :style="panelStyle"
          @mouseenter="onPanelEnter()"
          @mouseleave="onPanelLeave()"
          @click="openCategory = null"
        >
          <RouterLink
            v-for="tool in tools"
            :key="tool.key"
            :to="tool.key"
            class="dropdown-item"
            :class="{ active: route.path === tool.key }"
            @click="emit('navigate')"
          >
            <n-icon :component="tool.rawIcon" class="dropdown-icon" />
            <span class="dropdown-label">{{ tool.toolName }}</span>
          </RouterLink>
        </div>
      </Teleport>
    </div>
  </div>

  <!-- Vertical mode (default) -->
  <div v-else>
    <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name">
      <div ml-6px mt-12px flex cursor-pointer items-center op-60 @click="toggleCategoryCollapse({ name })">
        <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" text-16px lh-1 op-50 transition-transform>
          <icon-mdi-chevron-right />
        </span>

        <span ml-8px text-13px>
          {{ name }}
        </span>
      </div>

      <n-collapse-transition :show="!isCollapsed">
        <div class="menu-wrapper">
          <div class="toggle-bar" @click="toggleCategoryCollapse({ name })" />

          <n-menu
            class="menu"
            :value="route.path"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="tools"
            :indent="8"
            :default-expand-all="true"
          />
        </div>
      </n-collapse-transition>
    </div>
  </div>
</template>

<style scoped lang="less">
/* Horizontal menu */
.horizontal-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
}

.horizontal-trigger {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: v-bind('themeVars.textColor3');
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;

  &:hover {
    background: v-bind('themeVars.dividerColor + "40"');
    color: v-bind('themeVars.textColor2');
  }

  &.active {
    background: v-bind('themeVars.primaryColor + "15"');
    color: v-bind('themeVars.primaryColor');
  }

  &.open {
    background: v-bind('themeVars.dividerColor + "40"');
    color: v-bind('themeVars.textColor2');
  }
}

.trigger-arrow {
  font-size: 14px;
  opacity: 0.5;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &.flipped {
    transform: rotate(180deg);
    opacity: 0.8;
  }
}

.horizontal-trigger:hover .trigger-arrow {
  opacity: 0.8;
}

/* Dropdown panel */
.dropdown-panel {
  padding: 8px;
  min-width: 220px;
  background: v-bind('themeVars.bodyColor');
  border: 1px solid v-bind('themeVars.dividerColor');
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.05);
  z-index: 9999;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: v-bind('themeVars.textColor2');
  font-size: 14px;
  line-height: 1.4;
  transition: background 0.15s ease;

  &:hover {
    background: v-bind('themeVars.dividerColor + "40"');
  }

  &.active {
    background: v-bind('themeVars.primaryColor + "18"');
    color: v-bind('themeVars.primaryColor');
  }
}

.dropdown-icon {
  font-size: 20px;
  opacity: 0.65;
  flex-shrink: 0;
}

.dropdown-label {
  white-space: nowrap;
  line-height: 1.2;
}

/* Vertical menu */
.menu-wrapper {
  display: flex;
  flex-direction: row;
  .menu {
    flex: 1;
    margin-bottom: 5px;

    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 13px;
    }
  }

  .toggle-bar {
    width: 24px;
    opacity: 0.1;
    transition: opacity ease 0.2s;
    position: relative;
    cursor: pointer;

    &::before {
      width: 2px;
      height: 100%;
      content: ' ';
      background-color: v-bind('themeVars.textColor3');
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 14px;
    }

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
