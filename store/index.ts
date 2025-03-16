import { DriverStore, LocationStore, MarkerData } from "@/types/types";
import { create } from "zustand";


export const useLocation = create<LocationStore>((set) => ({
      userAddress: null,
      userLatitude: null,
      userLongitude: null,
      destinationAddress: null,
      destinationLatitude : null,
      destinationLongitude: null,
      setUserLocation: ({latitude,longitude,address}: {latitude: number, longitude: number, address: string}) => {
         set(() => ({
            userLatitude: latitude,
            userLongitude: longitude,
            userAddress: address

         }))
      },
     setDestinationLocation: ({latitude,longitude,address}: {latitude: number, longitude: number, address: string}) => {
          set(() => ({
              destinationLatitude: latitude,
              destinationLongitude: longitude,
              destinationAddress: address
          }))
     } 
}))

export const GarbageTruckLocation = create<DriverStore>((set) => ({
      drivers: [] as MarkerData[],
      selectedDriver: null,
      setSelectedDriver: (driverId: number) => set(() => ({
          selectedDriver: driverId
      })),
      setDrivers: (drivers: MarkerData[]) => set(() => ({
          drivers: drivers
      })),
      clearSelectedDriver: () => set(() => ({
            selectedDriver: null
      }))
}))