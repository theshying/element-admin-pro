<template>
  <div class="tags-view-container">
    <scroll-pane 
      ref="scrollPane" 
      class="tags-view-wrapper">
      <router-link 
        v-for="tag in Array.from(visitedViews)" 
        ref="tag" 
        :class="isActive(tag)?'active':''" 
        :to="tag"
        :key="tag.path" 
        class="tags-view-item" 
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ generateTitle(tag.title) }}
        <span 
          v-if="!tag.meta.noClose" 
          class="el-icon-close" 
          @click.prevent.stop="closeSelectedTag(tag)"/>
      </router-link>
    </scroll-pane>
    <ul 
      v-show="visible" 
      :style="{left:left+'px',top:top+'px'}" 
      class="contextmenu">
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>


<script>
import ScrollPane from '@/components/ScrollPane';
export default {
    components: {ScrollPane},
    data() {
        return {
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {},
        };
    },
    computed: {
        visitedViews() {
            const {visitedViews} = this.$store.state.tagsView;
            if (Array.isArray(visitedViews)) {
                return visitedViews;
            }
            return [];
        }
    },
    watch: {
        $route: {
            handler() {
                setTimeout(() => {
                    this.addViewTags();
                    this.moveToCurrentTag();
                }, 0);
            },
            immediate: true
        },
        visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu);
            } else {
                document.body.removeEventListener('click', this.closeMenu);
            }
        }
    },
    created() {
        const defaultRoute = {
            fullPath: '/dashboard',
            meta: {title: 'dashboard', icon: 'dashboard', noCache: true, noClose: true},
            name: 'dashboard',
            path: '/dashboard',
            title: 'dashboard',
        };
        this.$store.dispatch('addVisitedViews', defaultRoute);
    },

    methods: {
        generateTitle(title) {
              return this.$t(`route.${title}`);
        },
        generateRoute() {
            if (this.$route.name) {
                return this.$route;
            }
            return false;
        },
        isActive(route) {
            return route.path === this.$route.path;
        },
        addViewTags() {
            const route = this.generateRoute();
            if (!route) {
                return false;
            }
            this.$store.dispatch('addVisitedViews', route);
        },
        moveToCurrentTag() {
            const tags = this.$refs.tag;
            this.$nextTick(() => {
                for (const tag of tags) {
                    if (tag.to.path === this.$route.path) {
                        this.$refs.scrollPane.moveToTarget(tag.$el);
                        break;
                    }
                }
            });
        },
        closeSelectedTag(view) {
            this.$store.dispatch('delVisitedViews', view).then((views) => {
                if (this.isActive(view)) {
                    const latestView = views.slice(-1)[0];
                    if (latestView) {
                        this.$router.push(latestView);
                    } else {
                        this.$router.push('/');
                    }
                }
            });
        },
        closeOthersTags() {
            this.$router.push(this.selectedTag);
            this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
                this.moveToCurrentTag();
            });
        },
        closeAllTags() {
            this.$store.dispatch('delAllViews');
            this.$router.push('/');
        },
        openMenu(tag, e) {
            this.visible = true;
            this.selectedTag = tag;
            const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
            this.left = e.clientX - offsetLeft + 15; // 15: margin right
            this.top = e.clientY;
        },
        closeMenu() {
            this.visible = false;
        }
    },
};
</script>

<style  lang="less" scoped>
.tags-view-container {
  .tags-view-wrapper {
    background: #fff;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    /deep/ .scroll-wrapper{
      height: 100%;
      box-sizing: content-box;
    }
    .tags-view-item {
      box-sizing: border-box;
      position: relative;
      height: 100%;
      border-right: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 10px;
      font-size: 14px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      &.active {
        color: #2f89fe;
      }

    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      margin-left: 8px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        display: inline-block;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
