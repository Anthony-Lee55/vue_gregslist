<script setup>
import { AppState } from '@/AppState';
import HouseForm from '@/components/HouseForm.vue';
import HouseListing from '@/components/HouseListing.vue';
import { housesService } from '@/services/HousesService';
import Pop from '@/utils/Pop';
import { computed, onMounted } from 'vue';


const houses = computed(() => AppState.houses)


onMounted(() => {
  getHouses()
})

async function getHouses() {
  try {
    await housesService.getHouses()
  } catch (error) {
    Pop.error(error);
  }
}
</script>


<template>
  <div class="container">
    <section class="row mb-3">
      <div class="col-12">
        <h1 class="text-center">House</h1>
      </div>
    </section>

    <section class="row">
      <div class="col-12">
        <HouseForm />
      </div>
    </section>
    <section class="row">
      <div v-for="house in houses" :key="house.id">
        <HouseListing :house="house" />
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped></style>