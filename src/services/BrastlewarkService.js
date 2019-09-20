import axios from 'axios';

// Get the info of inhabitants
class BrastlewarkService {
  getAllHabitants() {
    return axios.get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
      .then(response => response);
  }
}

const brastlewarkService = new BrastlewarkService();

export default brastlewarkService;