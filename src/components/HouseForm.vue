<script setup>
import { AppState } from '@/AppState';
import { housesService } from '@/services/HousesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account)

const houseData = ref({
  bedrooms: 0,
  bathrooms: 0,
  levels: 0,
  imgUrl: '',
  year: new Date().getFullYear(),
  price: 0,
  description: '',
})

async function createHouse() {
  try {
    await housesService.createHouse(houseData.value)
    houseData.value = {
      bedrooms: 0,
      bathrooms: 0,
      levels: 0,
      imgUrl: '',
      year: new Date().getFullYear(),
      price: 0,
      description: ''
    }
    Pop.success('You just got Scammed👍')
  } catch (error) {
    Pop.error(error);
    logger.error('creating house', error)
  }
}

</script>


<template>
  <div v-if="account != null">
    <form @submit.prevent="createHouse()">
      <div class="d-flex col-md-12 gap-2 justify-content-center">
        <div class="form-floating mb-3 col-md-3">
          <input v-model="houseData.bedrooms" type="number" class="form-control" id="bedrooms" placeholder="Bedrooms..."
            required min="0">
          <label for="make">Bedrooms:</label>
        </div>
        <div class="form-floating mb-3 col-md-3">
          <input v-model="houseData.bathrooms" type="number" class="form-control" id="bathrooms"
            placeholder="Bathrooms..." required>
          <label for="make">Bathrooms:</label>
        </div>
        <div class="form-floating mb-3 col-md-3">
          <input v-model="houseData.levels" type="number" class="form-control" id="levels" placeholder="Levels..."
            required>
          <label for="make">Levels:</label>
        </div>
        <div class="form-floating mb-3 col-md-3">
          <input v-model="houseData.year" type="number" class="form-control" id="year" placeholder="Year..." required
            :max="new Date().getFullYear()" min="1600">
          <label for="year">Year:</label>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input v-model="houseData.imgUrl" type="url" class="form-control" id="imgUrl" placeholder="House ImgUrl..."
          maxlength="500">
        <label for="imgUrl">ImgUrl:</label>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">House Price: ${{ houseData.price }}</label>
        <input v-model="houseData.price" type="range" class="form-range" id="price" max="100000000" min="0" required>
      </div>
      <div class="form-floating mb-3">
        <textarea v-model="houseData.description" class="form-control" placeholder="House Description" id="description"
          maxlength="5000"></textarea>
        <label for="description">House Description</label>
      </div>
      <div class="text-end">
        <button class="btn btn-success" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>