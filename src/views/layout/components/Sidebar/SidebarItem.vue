<template>
  <div 
    v-if="!item.hidden&&item.children" 
    class="menu-wrapper"
  >
    <router-link 
      v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow" 
      :to="resolvePath(onlyOneChild.path)"
    >
      <el-menu-item 
        :index="resolvePath(onlyOneChild.path)" 
        :class="{'submenu-title-noDropdown':!isNest}"
      >
        <i 
          v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" 
          :class="onlyOneChild.meta.icon"
        />
        <span 
          v-if="onlyOneChild.meta&&onlyOneChild.meta.title" 
          slot="title"
        >{{ generateTitle(onlyOneChild.meta.title) }}</span>
      </el-menu-item>
    </router-link>

    <el-submenu 
      v-else 
      :index="item.name||item.path"
    >
      <template slot="title">
        <i
          v-if="item.meta&&item.meta.icon" 
          :class="item.meta.icon"
        />
        <span 
          v-if="item.meta&&item.meta.title" 
          slot="title"
        >{{ generateTitle(item.meta.title) }}</span>
      </template>

      <template 
        v-for="child in item.children.filter(item => !item.hidden)" 
      >
        <sidebar-item 
          v-if="child.children&&child.children.length>0" 
          :key="child.path" 
          :is-nest="true" 
          :item="child" 
          :base-path="resolvePath(child.path)" 
          class="nest-menu"
        />

        <router-link 
          v-else 
          :key="child.name" 
          :to="resolvePath(child.path)"
        >
          <el-menu-item :index="resolvePath(child.path)">
            <i
              v-if="child.meta&&child.meta.icon" 
              :icon-class="child.meta.icon"
            />
            <span 
              v-if="child.meta&&child.meta.title" 
              slot="title"
            >{{ generateTitle(child.meta.title) }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';

export default {
    name: 'SidebarItem',
    props: {
    // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            onlyOneChild: null
        };
    },
    methods: {
        hasOneShowingChild(children) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                }
                // temp set(will be used if only has one showing child )
                this.onlyOneChild = item;
                return true;
            });
            if (showingChildren.length === 1) {
                return true;
            }
            return false;
        },
        resolvePath(...paths) {
            return path.resolve(this.basePath, ...paths);
        },
        generateTitle(title) {
           return this.$t(`route.${title}`);

        }
    }
};
</script>

