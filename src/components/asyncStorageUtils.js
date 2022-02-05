import AsyncStorage from '@react-native-community/async-storage'

const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('appData', JSON.stringify(data))
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }


  const readData = async () => {
    try {
      let data = await AsyncStorage.getItem('appData');
      const parseData = JSON.parse(data);
     return parseData;
      
    } catch (e) {
      console.log('Failed to fetch the data from storage')
    }
  }

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('appData')
      console('Storage successfully cleared!')
    } catch (e) {
      console.log('Failed to clear the async storage.')
    }
  }
  
  export { saveData , readData , clearStorage}