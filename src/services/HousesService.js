import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { House } from "@/models/House.js"
import { AppState } from "@/AppState.js"


class HousesService{

  async getHouses(){
    const response = await api.get('api/houses')
    logger.log('got houses', response.data)
    const houses = response.data.map(housePOJO => new House(housePOJO))
    AppState.houses = houses
  }

  async createHouse(houseData){
    const response = await api.post('api/houses', houseData)
    logger.log('Created house', response.data)
    const house = new House(response.data)
    AppState.houses.push(house)
  }

  async deleteHouse(houseId){
    const response = await api.delete(`api/houses/${houseId}`)
    logger.log('Deleting house', response.data)
    const houseIndex = AppState.houses.findIndex(house => house.id == houseId)
    AppState.houses.splice(houseIndex, 1)
  }
}
export const housesService = new HousesService()