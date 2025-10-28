<template>
  <AppContainer>
    <div class="flex h-screen overflow-hidden bg-gray-100">
      
      <Sidebar 
        :is-sidebar-open="isSidebarOpen"
        @toggle-sidebar="toggleSidebar" 
      />
      
      <div class="flex-1 flex flex-col overflow-hidden">
        
        <Header />
        
        <main class="flex-1 overflow-auto p-6 md:p-8">
          <div class="block sm:hidden">
            <RouterView v-if="!isSidebarOpen" />
          </div>
          <div class="sm:block hidden">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
  </AppContainer>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import AppContainer from '../components/AppContainer.vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>