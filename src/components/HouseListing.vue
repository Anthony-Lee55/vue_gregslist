<script setup>
import { AppState } from '@/AppState';
import { House } from '@/models/House';
import { housesService } from '@/services/HousesService';
import { logger } from '@/utils/Logger';
import Pop from '@/utils/Pop';
import { computed } from 'vue';



const props = defineProps({
  house: { type: House, required: true }
})

const account = computed(() => AppState.account)

async function deleteHouse() {
  try {
    const confirmed = await Pop.confirm('Delete your home?')
    if (!confirmed) { return }
    const houseId = props.house.id
    await housesService.deleteHouse(houseId)
  } catch (error) {
    logger.error('deleting house', error)
  }
}
</script>


<template>
  <div class="row bg-light shadow m-4">
    <div class="col-md-4 px-0">
      <img :src="house.imgUrl" alt="somebody has a broken image" class="img-fluid card-img">
    </div>
    <div class="col-md-8">
      <div class="p-3 d-flex flex-column justify-content-between h-100">
        <div>
          <h3>Year: {{ house.year }} Bedrooms: {{ house.bedrooms }} Bathrooms: {{ house.bathrooms }} Levels:
            {{ house.levels }}</h3>
          <p class="fs-3">${{ house.price }}</p>
          <p>{{ house.description }}</p>
          <p>Listed: {{ house.createdAt.toLocaleDateString() }}</p>
        </div>
        <div class="d-flex justify-content-end gap-3 align-items-center">=
          <button v-if="account?.id == house.creatorId" @click="deleteHouse()" class="btn btn-outline-danger"
            type="button" title="Delete House">
            <i class="mdi mdi-delete-forever"></i>
          </button>
          <span>{{ house.creator.name }}</span>
          <img :src="house.creator.picture" :alt="house.creator.name" class="creator-img">
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-img {
  height: 45dvh;
  width: 100%;
  object-fit: cover;
}

.creator-img {
  height: 8dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>