<template>
  <div class="navbar">
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    /> -->
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import Breadcrumb from '@/components/Breadcrumb/index.vue'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }

}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0px;
  left: 210px;
  height: 50px;
  width: calc(100% - 210px);
  padding: 0 30px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 1000;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
}
</style>
